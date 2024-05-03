import { google, sheets_v4 } from "googleapis"
import { Client, Setting, Credentials, GoogleSpreadSheet, Headers } from "../types"

export default class googleService {

  private static instance?: googleService
  private client: Client
  private setting: Setting
  private spreadSheetService: sheets_v4.Resource$Spreadsheets
  private scope: string[]
  private accessType: string
  private prompt: string
  private valueInputOption: string

  //singleton
  public static initClient(setting: Setting) {
    return googleService.instance ??= (new googleService(setting))
  }

  //singleton private constructor
  private constructor(setting: Setting) {
    //google static options
    this.accessType = 'offline'
    this.prompt = 'consent'
    this.valueInputOption = 'USER_ENTERED'
    this.scope = [
      'https://www.googleapis.com/auth/userinfo.email', //user email info permission
      'https://www.googleapis.com/auth/spreadsheets' //spreedsheet permission
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

  public createSpreadSheet(title: string, headers: Headers) {
    return this.spreadSheetService.create({
      requestBody: {
        properties: { title }
      }
    }).then((spreadSheetRes) => this.spreadSheetService.values.update({
      spreadsheetId: spreadSheetRes.data.spreadsheetId!,
      range: this.getSheetRange(spreadSheetRes.data.sheets?.[0].properties?.title!, headers),
      valueInputOption: this.valueInputOption,
      requestBody: { values: [headers] }
    }).then((): GoogleSpreadSheet => ({
      title: title,
      headers: headers,
      googleId: spreadSheetRes.data.spreadsheetId!,
      googleUrl: spreadSheetRes.data.spreadsheetUrl!
    })),
    )
  }

  public getSheetRange(sheetTitle: string, headers: Headers) {
    const unicodeOfFirstCellChar_A = 65
    const orderOfLastCellChar = headers.length - 1
    const lastCellCharByUnicode = String.fromCharCode(unicodeOfFirstCellChar_A + orderOfLastCellChar)
    return `${sheetTitle}!A1:${lastCellCharByUnicode}1`
  }
}
