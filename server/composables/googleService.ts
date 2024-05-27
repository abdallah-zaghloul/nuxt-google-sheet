import { google, sheets_v4 } from "googleapis"
import { GaxiosResponse, GaxiosPromise } from "gaxios"
import { Client, Setting, Credentials, GoogleSpreadSheet, Headers, UserProfileInfo, CreateOrderEvent } from "../utils/types"
import mediatorService from "./mediatorService"

export default class googleService {

  private static instance?: googleService
  private client: Client
  private setting: Setting
  private scope: string[]
  private accessType: string
  private prompt: string
  private valueInputOption: string
  private mainSheetTitle: string
  private mainSheetRange: string
  private userInfoUrl: string
  private updateFields: { title: string, custom: string }
  //services
  private spreadSheetService: sheets_v4.Resource$Spreadsheets


  //singleton
  public static initClient(setting: Setting) {
    return googleService.instance ??= (new googleService(setting))
  }

  //singleton private constructor
  private constructor(setting: Setting) {
    //google static options
    this.accessType = 'offline'
    this.prompt = 'consent'
    this.mainSheetTitle = 'Youcan-Orders'
    this.userInfoUrl = 'https://www.googleapis.com/oauth2/v3/userinfo'
    this.valueInputOption = 'USER_ENTERED'
    this.mainSheetRange = `${this.mainSheetTitle}!A1:Z1`
    this.updateFields = {
      title: 'title',
      custom: 'userEnteredValue'
    }
    this.scope = [
      'https://www.googleapis.com/auth/userinfo.email', //user email info permission
      'https://www.googleapis.com/auth/spreadsheets', //spreedsheet permission
      // 'https://www.googleapis.com/auth/userinfo.profile' //user full profile info permission
    ]

    // setting & OAuth2Client
    this.setting = setting
    this.client = (new google.auth.OAuth2({
      clientId: this.setting.clientId,
      clientSecret: this.setting.clientSecret,
      redirectUri: process.env.GOOGLE_AUTH_CALLBACK_URL
    }))

    // set Client Credentials from setting
    this.setClientCredentials(this.setting.credentials)

    //init google sheet service for auth client
    this.spreadSheetService = google.sheets({ version: "v4", auth: this.client }).spreadsheets
  }



  public getAuthUrl() {
    return this.client.generateAuthUrl({
      access_type: this.accessType,
      prompt: this.prompt,
      state: this.setting.storeId,
      scope: this.scope
    })
  }



  public authTokensByCode(code: string): Promise<Credentials | null | undefined> {
    return this.client.getToken(code).then(
      res => this.setClientCredentials(res.tokens, true)
    )
  }



  private async setClientCredentials(credentials?: Credentials | null, setEmail: boolean = false) {
    if (credentials) {
      this.client.setCredentials(credentials)
      this.setting.credentials = credentials
    }

    if (setEmail)
      this.setting.email = await this.getEmail()

    this.setting = await mediatorService('connectSetting', this.setting.storeId, this.setting.credentials!, this.setting.email)
    return credentials

  }



  public getProfile(): Promise<UserProfileInfo | null> {
    return this.client.request({
      url: this.userInfoUrl
    }).then(
      profile => profile.data as UserProfileInfo,
      onrejected => null
    )
  }



  public getEmail(): Promise<string | undefined> {
    return this.getProfile().then(profile => profile?.email || undefined)
  }


  //spreadSheet RequestPayloads
  private spreadSheetReq(): {
    createSpreadSheet: (title: string, headers: Headers) => sheets_v4.Schema$Spreadsheet,
    updateSpreadSheetTitle: (title: string) => sheets_v4.Schema$Request,
    updateMainSheetHeaders: (spreadSheetId: string, headers: Headers) => Promise<sheets_v4.Schema$Request>
    addMainSheet: () => sheets_v4.Schema$Request
  } {
    return {
      //create spread sheet request payload
      createSpreadSheet: (title: string, headers: Headers) => ({
        properties: { title: title },
        sheets: [
          //1st sheet of spreadSheetFile
          {
            properties: {
              title: this.mainSheetTitle,
            },
            data: [{ rowData: [{ values: this.headerRowValues(headers) }] }]
          }
        ]
      }),

      //update spread sheet title request payload
      updateSpreadSheetTitle: (title: string) => ({
        updateSpreadsheetProperties: {
          properties: {
            title: title,
          },
          fields: this.updateFields.title,
        }
      }),

      //update main sheet headers request payload
      updateMainSheetHeaders: async (spreadSheetId: string, headers: Headers) => ({
        updateCells: {
          rows: [{ values: this.headerRowValues(headers) }],
          fields: this.updateFields.custom,
          start: {
            sheetId: await this.getMainSheetId(spreadSheetId),
            rowIndex: 0, // Assuming headers are in the first row
            columnIndex: 0
          }
        }
      }),

      //add main sheet request payload
      addMainSheet: () => ({
        addSheet: {
          properties: {
            title: this.mainSheetTitle,
          },
        },
      }),
    }
  }



  public createSpreadSheet(title: string, headers: Headers): Promise<GoogleSpreadSheet | null> {
    return this.spreadSheetService.create({
      requestBody: this.spreadSheetReq().createSpreadSheet(title, headers)
    }).then(
      res => this.spreadSheetGetter({
        res: res,
        title: title,
        headers: headers,
        googleId: res.data.spreadsheetId!,
        googleUrl: res.data.spreadsheetUrl!
      })
    )
  }



  public async updateSpreadSheet(spreadSheetId: string, title: string, headers: Headers): Promise<GoogleSpreadSheet | null> {
    return this.batchUpdateSpreadSheet(
      spreadSheetId,
      this.spreadSheetReq().updateSpreadSheetTitle(title),
      await this.spreadSheetReq().updateMainSheetHeaders(spreadSheetId, headers)
    ).then(
      res => this.spreadSheetGetter({
        res: res,
        title: title,
        headers: headers,
        googleId: res.data.updatedSpreadsheet?.spreadsheetId!,
        googleUrl: res.data.updatedSpreadsheet?.spreadsheetUrl!
      }),
    )
  }


  public appendOrderToSheet(spreadSheetId: string, orderEvent: CreateOrderEvent, headers: Headers)
    : GaxiosPromise<sheets_v4.Schema$AppendValuesResponse> {

    const appendRowToSheet = () => this.spreadSheetService.values.append({
      spreadsheetId: spreadSheetId,
      range: this.mainSheetRange,
      valueInputOption: this.valueInputOption,
      requestBody: {
        values: [this.orderEventToSheetRow(orderEvent, headers)]
      }
    })

    return this.getOrSetMainSheet(spreadSheetId).then(
      async ({ hasOldMainSheet }) => hasOldMainSheet ? appendRowToSheet() : this.batchUpdateSpreadSheet(
        spreadSheetId,
        await this.spreadSheetReq().updateMainSheetHeaders(spreadSheetId, headers)
      ).then(() => appendRowToSheet())
    )
  }



  private spreadSheetGetter({ res, title, headers, googleId, googleUrl }: {
    res: GaxiosResponse,
    title: string,
    headers: Headers,
    googleId: string,
    googleUrl: string
  }): GoogleSpreadSheet | null {

    if (helper.check((res.status >= 200 && res.status < 300), res))
      return {
        title: title,
        headers: headers,
        googleId: googleId,
        googleUrl: googleUrl
      }

    return null
  }



  private getSheets(spreadSheetId: string): Promise<sheets_v4.Schema$Sheet[]> {
    return this.spreadSheetService.get({
      spreadsheetId: spreadSheetId
    }).then(
      ({ data: spreadSheet }) => spreadSheet.sheets!
    )
  }



  private headerRowValues(headers: Headers): sheets_v4.Schema$CellData[] {
    return headers.map(header => ({ userEnteredValue: { stringValue: header } }))
  }



  private async getOrSetMainSheet(spreadSheetId: string): Promise<{ mainSheet: sheets_v4.Schema$Sheet, hasOldMainSheet: boolean }> {

    const findMainSheet = (sheets: sheets_v4.Schema$Sheet[]) => sheets.find(
      (sheet) => sheet.properties?.title === this.mainSheetTitle
    )!

    let mainSheet = await this.getSheets(spreadSheetId).then(sheets => findMainSheet(sheets))
    const hasOldMainSheet = mainSheet ? true : false

    mainSheet ??= await this.batchUpdateSpreadSheet(spreadSheetId, this.spreadSheetReq().addMainSheet()).then(
      ({ data }) => findMainSheet(data.updatedSpreadsheet?.sheets!)
    )

    return {
      mainSheet,
      hasOldMainSheet
    }
  }



  private getMainSheetId(spreadSheetId: string): Promise<number | null | undefined> {
    return this.getOrSetMainSheet(spreadSheetId).then(({ mainSheet }) => mainSheet.properties?.sheetId)
  }



  private batchUpdateSpreadSheet(spreadSheetId: string, ...requests: sheets_v4.Schema$Request[])
    : GaxiosPromise<sheets_v4.Schema$BatchUpdateSpreadsheetResponse> {
    return this.spreadSheetService.batchUpdate({
      spreadsheetId: spreadSheetId,
      requestBody: {
        //saves another request "returns updated spreadSheet object at response"
        includeSpreadsheetInResponse: true,
        requests: requests,
      },
    })
  }



  private orderEventToSheetRow(orderEvent: CreateOrderEvent, headers: Headers): (string | number | null | undefined)[] {

    const order = {
      "Order ID": orderEvent?.ref,
      "First name": orderEvent?.customer?.first_name,
      "Last name": orderEvent?.customer?.last_name,
      "Full name": orderEvent?.customer?.full_name,
      "Email": orderEvent?.customer?.email,
      "Phone": orderEvent?.customer?.phone,
      "Country": orderEvent?.customer?.country,
      "Region": orderEvent?.customer?.region,
      "City": orderEvent?.customer?.city,
      "Address city": orderEvent?.shipping?.address?.city,
      "Address state": orderEvent?.shipping?.address?.state,
      "Address country": orderEvent?.shipping?.address?.country_name,
      "Address currency": orderEvent?.customer_currency?.code,
      "Address zip code": orderEvent?.shipping?.address?.zip_code,
      "Address 1": orderEvent?.shipping?.address?.first_line,
      "Address 2": orderEvent?.shipping?.address?.second_line,

      "Full address": [
        orderEvent?.shipping?.address?.country_name,
        orderEvent?.shipping?.address?.state,
        orderEvent?.shipping?.address?.city,
        orderEvent?.shipping?.address?.region,
        orderEvent?.shipping?.address?.company,
        orderEvent?.shipping?.address?.first_line,
        orderEvent?.shipping?.address?.second_line,
        orderEvent?.shipping?.address?.zip_code
      ].join(','),

      "Total tax": orderEvent?.vat,
      "Order date": orderEvent?.created_at,
      "Total charge": orderEvent?.total,
      "Total shipping fees": orderEvent?.shipping?.price,
      "Payment status": orderEvent?.payment?.status,
      "Total discount": orderEvent?.discount?.value,
      "Total quantity": helper.getNestedProp(orderEvent?.variants, 'quantity'),
      "Shipping status": orderEvent?.shipping?.status,
      "Tracking number": orderEvent?.shipping?.tracking_number,
      "Variant price": helper.getNestedProp(orderEvent?.variants, 'price'),
      "Order customer currency": orderEvent?.customer_currency?.code,
      "Total with customer currency": orderEvent?.customer_currency?.major_value,

      //missing
      "SKU": helper.getNestedProp(orderEvent?.variants, 'sku'), /* Stock Keeping Unit */
      "Vendor": helper.getNestedProp(orderEvent?.variants, 'vendor'),
      "Total coupon": helper.getNestedProp(orderEvent?.variants, 'total_coupon'),
      "Payment gateway": helper.getNestedProp(orderEvent?.variants, 'payment_gateway'),
      "Product name": helper.getNestedProp(orderEvent?.variants, 'product_name'),
      "Product URL": helper.getNestedProp(orderEvent?.variants, 'product_url'),
      "Product variant": helper.getNestedProp(orderEvent?.variants, 'product_variant'),
    }

    return headers.map(header => order?.[header])
  }
}
