import { google, sheets_v4 } from "googleapis"
import { GaxiosResponse, GaxiosPromise } from "gaxios"
import { Client, Setting, GoogleSpreadSheet, Headers, UserProfileInfo, OrderEvent, Order, GoogleAuthWays, Credentials } from "../utils/types"
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
  private authUrl?: string
  private updateFields: { title: string, custom: string }
  //services
  private spreadSheetService: sheets_v4.Resource$Spreadsheets


  //singleton
  public static initClient(
    setting: Setting,
    authWay: keyof GoogleAuthWays = 'credentials',
    ...authParams: Parameters<GoogleAuthWays[typeof authWay]>
  ) {
    return googleService.instance ??= (new googleService(setting, authWay, ...authParams))
  }

  //singleton private constructor
  private constructor(
    setting: Setting,
    authWay: keyof GoogleAuthWays = 'credentials',
    ...authParams: Parameters<GoogleAuthWays[typeof authWay]>
  ) {
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

    //auth client or fail
    this.authClient(authWay, ...authParams)

    //init google sheet service for auth client
    this.spreadSheetService = google.sheets({ version: "v4", auth: this.client }).spreadsheets
  }



  private authClient<Way extends keyof GoogleAuthWays>(way: Way, ...params: Parameters<GoogleAuthWays[Way]>)
    : ReturnType<GoogleAuthWays[Way]> {

    const authWays: GoogleAuthWays = {
      // exchange authCode with credentials (token), set email for first time
      authCode: async (authCode: string) => {
        const credentials = await this.client.getToken(authCode).then(res => res.tokens)
        this.client.setCredentials(credentials)
        return await this.connectClient(credentials, await this.getEmail())

      },
      //auth & refresh credentials
      credentials: async () => {
        if (this.setting.credentials) {
          this.client.setCredentials(this.setting.credentials)
          return await this.connectClient(this.setting.credentials)
        }
        return await this.disconnectClient()
      },
      authUrl: async () => this.setAuthUrl()
    }

    //@ts-ignore
    return authWays[way](...params)
  }

  public getSetting() {
    return this.setting
  }


  public getAuthUrl() {
    return this.authUrl!
  }



  private setAuthUrl() {
    return this.authUrl = this.client.generateAuthUrl({
      access_type: this.accessType,
      prompt: this.prompt,
      state: this.setting.storeId,
      scope: this.scope
    })
  }



  private async disconnectClient() {
    this.setting = await mediatorService('disconnectSetting', this.setting.storeId)!
    return handler.unAuthorizedError('Please reconnect your google account')
  }



  private async connectClient(credentials: Credentials, email?: string) {
    this.setting = await mediatorService('connectSetting', this.setting.storeId, credentials, email)!
    return this.setting.credentials!
  }


  public async getProfile(): Promise<UserProfileInfo | null> {
    return this.client.request({
      url: this.userInfoUrl
    }).then(
      profile => profile.data as UserProfileInfo,
      onrejected => null
    )
  }



  public async getEmail(): Promise<string | undefined> {
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



  public async createSpreadSheet(title: string, headers: Headers): Promise<GoogleSpreadSheet | null> {
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


  public async appendOrdersToSheet(spreadSheetId: string, headers: Headers, ...orders: (Order | OrderEvent | undefined)[])
    : Promise<boolean> {

    const appendRowsToSheet = async () => await this.spreadSheetService.values.append({
      spreadsheetId: spreadSheetId,
      range: this.mainSheetRange,
      valueInputOption: this.valueInputOption,
      requestBody: {
        values: this.ordersToSheetRows(orders, headers)
      }
    })

    return this.batchUpdateSpreadSheet(
      spreadSheetId,
      await this.spreadSheetReq().updateMainSheetHeaders(spreadSheetId, headers)
    )
      .then(() => appendRowsToSheet())
      .then(res => helper.checkRes(res))
  }



  private spreadSheetGetter({ res, title, headers, googleId, googleUrl }: {
    res: GaxiosResponse,
    title: string,
    headers: Headers,
    googleId: string,
    googleUrl: string
  }): GoogleSpreadSheet | null {

    if (helper.checkRes(res))
      return {
        title: title,
        headers: headers,
        googleId: googleId,
        googleUrl: googleUrl
      }

    return null
  }



  private async getSheets(spreadSheetId: string): Promise<sheets_v4.Schema$Sheet[]> {
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



  private async getMainSheetId(spreadSheetId: string): Promise<number | null | undefined> {
    return await this.getOrSetMainSheet(spreadSheetId).then(({ mainSheet }) => mainSheet.properties?.sheetId)
  }



  private async batchUpdateSpreadSheet(spreadSheetId: string, ...requests: sheets_v4.Schema$Request[])
    : GaxiosPromise<sheets_v4.Schema$BatchUpdateSpreadsheetResponse> {
    return await this.spreadSheetService.batchUpdate({
      spreadsheetId: spreadSheetId,
      requestBody: {
        //saves another request "returns updated spreadSheet object at response"
        includeSpreadsheetInResponse: true,
        requests: requests,
      },
    })
  }



  private orderToSheetRow(order: Order | OrderEvent, headers: Headers): any[] {

    const orderData = {
      "Order ID": order?.ref,
      "First name": order?.customer?.first_name,
      "Last name": order?.customer?.last_name,
      "Full name": order?.customer?.full_name,
      "Email": order?.customer?.email,
      "Phone": order?.customer?.phone,
      "Country": order?.customer?.country,
      "Region": order?.customer?.region,
      "City": order?.customer?.city,
      "Address city": order?.shipping?.address?.city,
      "Address state": order?.shipping?.address?.state,
      "Address country": order?.shipping?.address?.country_name,
      "Address currency": order?.customer_currency?.code,
      "Address zip code": order?.shipping?.address?.zip_code,
      "Address 1": order?.shipping?.address?.first_line,
      "Address 2": order?.shipping?.address?.second_line,

      "Full address": [
        order?.shipping?.address?.country_name,
        order?.shipping?.address?.state,
        order?.shipping?.address?.city,
        order?.shipping?.address?.region,
        order?.shipping?.address?.company,
        order?.shipping?.address?.first_line,
        order?.shipping?.address?.second_line,
        order?.shipping?.address?.zip_code
      ].join(','),

      "Total tax": order?.vat,
      "Order date": order?.created_at,
      "Total charge": order?.total,
      "Total shipping fees": order?.shipping?.price,
      "Payment status": order?.payment?.status,
      "Total discount": order?.discount?.value,
      "Total quantity": helper.getNestedProp(order?.variants, 'quantity'),
      "Shipping status": order?.shipping?.status,
      "Tracking number": order?.shipping?.tracking_number,
      "Variant price": helper.getNestedProp(order?.variants, 'price'),
      "Order customer currency": order?.customer_currency?.code,
      "Total with customer currency": order?.customer_currency?.major_value,
      "SKU": helper.getNestedProp(order?.variants, 'variant')?.sku,

      //missing
      "Vendor": helper.getNestedProp(order?.variants, 'vendor'),
      "Total coupon": helper.getNestedProp(order?.variants, 'total_coupon'),
      "Payment gateway": order?.payment?.gateway_type_text,

      "Product name": helper.getNestedProp(order?.variants, 'variant')?.product?.name,
      "Product URL": helper.getNestedProp(order?.variants, 'variant')?.product?.public_url,
      "Product variant": helper.getNestedProp(order?.variants, 'variant')?.product?.has_variants,
    }

    return headers.map(header => orderData?.[header])
  }



  private ordersToSheetRows(orders: (Order | OrderEvent | undefined)[], headers: Headers): any[] {
    return orders.reduce((orderRows: any[], order) => {
      helper.isSet(order) && orderRows.push(this.orderToSheetRow(order!, headers))
      return orderRows
    }, [])
  }

}
