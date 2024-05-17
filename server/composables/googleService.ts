import { google, sheets_v4 } from "googleapis"
import { GaxiosResponse } from "gaxios"
import { Client, Setting, Credentials, GoogleSpreadSheet, Headers, UserProfileInfo, Sheet, CreateOrderEvent } from "../utils/types"

export default class googleService {

  private static instance?: googleService
  private client: Client
  private setting: Setting
  private scope: string[]
  private accessType: string
  private prompt: string
  private mainSheetTitle: string
  private userInfoUrl: string
  private updateableFields: { title: string, custom: string }
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
    this.updateableFields = {
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
    this.setting.credentials && this.setClientCredentials(this.setting.credentials)

    //init google sheet service for auth client
    this.spreadSheetService = google.sheets({ version: "v4", auth: this.client }).spreadsheets
  }



  public getClient(): Client {
    return this.client
  }



  public getAuthUrl() {
    return this.client.generateAuthUrl({
      access_type: this.accessType,
      prompt: this.prompt,
      state: this.setting.storeId,
      scope: this.scope
    })
  }



  public authTokensByCode(code: string): Promise<Credentials | null> {
    return this.client.getToken(code).then(
      onfulfilled => this.setClientCredentials(onfulfilled.tokens),
      onrejected => null
    )
  }



  public setClientCredentials(credentials: Credentials) {
    this.client.setCredentials(credentials)
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



  public getEmail(): Promise<string | null> {
    return this.getProfile().then(profile => profile?.email || null)
  }


  //spreadSheet RequestPayloads
  private spreadSheetReq() {
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
          fields: this.updateableFields.title,
        }
      }),

      //update main sheet headers request payload
      updateMainSheetHeaders: async (spreadSheetId: string, headers: Headers) => ({
        updateCells: {
          rows: [{ values: this.headerRowValues(headers) }],
          fields: this.updateableFields.custom,
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



  public async updateSpreadSheet(sheet: Sheet, title?: string, headers?: Headers): Promise<GoogleSpreadSheet | null> {

    title ??= sheet.title
    headers ??= sheet.headers

    return this.spreadSheetService.batchUpdate({
      spreadsheetId: sheet.googleId,
      requestBody: {
        //saves another request "returns updated spreadSheet object at response"
        includeSpreadsheetInResponse: true,
        requests: [
          this.spreadSheetReq().updateSpreadSheetTitle(title),
          await this.spreadSheetReq().updateMainSheetHeaders(sheet.googleId, headers)
        ],
      },
    }).then(
      res => this.spreadSheetGetter({
        res: res,
        title: title,
        headers: headers,
        googleId: res.data.updatedSpreadsheet?.spreadsheetId!,
        googleUrl: res.data.updatedSpreadsheet?.spreadsheetUrl!
      }),
    )
  }



  private spreadSheetGetter({ res, title, headers, googleId, googleUrl }: {
    res: GaxiosResponse,
    title: string,
    headers: Headers,
    googleId: string,
    googleUrl: string
  }): GoogleSpreadSheet | null {

    if (check((res.status >= 200 && res.status < 300), res))
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



  private async getMainSheet(spreadSheetId: string): Promise<sheets_v4.Schema$Sheet> {

    const findMainSheet = (sheets: sheets_v4.Schema$Sheet[]) => sheets.find((sheet) => sheet.properties?.title === this.mainSheetTitle)!
    const mainSheet = this.getSheets(spreadSheetId).then(sheets => findMainSheet(sheets))

    return await mainSheet ?? this.spreadSheetService.batchUpdate({
      spreadsheetId: spreadSheetId,
      requestBody: {
        //saves another request "returns updated spreadSheet object at response"
        includeSpreadsheetInResponse: true,
        requests: [
          this.spreadSheetReq().addMainSheet()
        ]
      }
    }).then(
      ({ data }) => findMainSheet(data.updatedSpreadsheet?.sheets!)
    )
  }



  private getMainSheetId(spreadSheetId: string) {
    return this.getMainSheet(spreadSheetId).then(mainSheet => mainSheet.properties?.sheetId)
  }



  public orderEventToSheetRow(orderEvent: CreateOrderEvent): { [key in (Header | OrderId)]: any } {
    //@ts-ignore
    return {
      "Order ID": orderEvent.id,
      /* customer */
      "First name": orderEvent.customer?.first_name,
      "Last name": orderEvent.customer?.last_name,
      "Full name": orderEvent.customer?.full_name,
      "Email": orderEvent.customer?.email,
      "Phone": orderEvent.customer?.phone,
      "Country": orderEvent.customer?.country,
      // "Region": orderEvent.customer?,
      "City": orderEvent.customer.city,
      // "Address city": orderEvent.customer?.address,
      // "Address state": orderEvent.customer?.address,
      // "Address country": orderEvent.customer?.address,
      // "Address currency": orderEvent.customer?.address,
      // "Address zip code": orderEvent.customer?.address,
      // "Address 1": orderEvent.customer?.address,
      // "Address 2": orderEvent.customer?.address,
      // "Full address": orderEvent.customer?.address,

      /* order */
      //  "SKU": orderEvent /* Stock Keeping Unit */
      //  "Vendor": orderEvent,
      //  "Total tax": orderEvent,
      "Order date": orderEvent.created_at,
      //  "Total charge": orderEvent,
      //  "Total coupon": orderEvent,
      "Total shipping fees": orderEvent.shipping?.price,
      "Payment status": orderEvent.payment?.status,
      "Total discount": orderEvent.discount?.value,
      //  "Total quantity": orderEvent,
      //  "Payment gateway": orderEvent.payment?
      "Shipping status": orderEvent.shipping?.status,
      "Tracking number": orderEvent.shipping?.tracking_number,
      //  "Product name": orderEvent,
      //  "Product URL": orderEvent,
      //  "Product variant": orderEvent.variants?,
      //  "Variant price": orderEvent.variants?,
      "Order customer currency": orderEvent.customer_currency?.code,
      "Total with customer currency": orderEvent.total
    }
  }
}
