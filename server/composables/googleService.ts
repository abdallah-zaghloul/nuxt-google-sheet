import { google, sheets_v4 } from "googleapis"
import { Client, Setting, Credentials, GoogleSpreadSheet, Headers, UserProfileInfo, Sheet } from "../utils/types"

export default class googleService {

  private static instance?: googleService
  private client: Client
  private setting: Setting
  private scope: string[]
  private accessType: string
  private prompt: string
  private valueInputOption: string
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
    this.valueInputOption = 'USER_ENTERED'
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

  public createSpreadSheet(title: string, headers: Headers): Promise<GoogleSpreadSheet | null> {
    return this.spreadSheetService.create({
      requestBody: {
        properties: { title }
      }
    }).then(({ data }) => this.spreadSheetService.values.update({
      spreadsheetId: data.spreadsheetId!,
      range: this.getSheetRange(data.sheets?.[0].properties?.title!, headers),
      valueInputOption: this.valueInputOption,
      requestBody: { values: [headers] }
    }).then(
      onfulfilled => this.spreadSheetGetter(title, headers, data.spreadsheetId!, data.spreadsheetUrl!),
      onrejected => null
    ))
  }

  public async batchUpdateSpreadSheet(sheet: Sheet, title?: string, headers?: Headers): Promise<GoogleSpreadSheet | null> {

    title ??= sheet.title
    headers ??= sheet.headers

    return this.spreadSheetService.batchUpdate({
      spreadsheetId: sheet.googleId,
      requestBody: {
        requests: [
          this.getUpdateSpreadSheetTitleRequest(title),
          ...(await this.getUpdateSheetsHeadersRequests(sheet.googleId, headers))!
        ],
      },
    }).then(
      onfulfilled => this.spreadSheetGetter(title, headers, sheet.googleId, sheet.googleUrl),
      onrejected => null
    )
  }

  private spreadSheetGetter(title: string, headers: Headers, spreadSheetId: string, spreadSheetUrl: string): GoogleSpreadSheet {
    return {
      title: title,
      headers: headers,
      googleId: spreadSheetId,
      googleUrl: spreadSheetUrl
    }
  }

  private getSheets(spreadSheetId: string): Promise<sheets_v4.Schema$Sheet[]> {
    return this.spreadSheetService.get({
      spreadsheetId: spreadSheetId
    }).then(
      ({ data: spreadSheet }) => spreadSheet.sheets!
    )
  }

  private getUpdateSpreadSheetTitleRequest(title: string): sheets_v4.Schema$Request {
    return {
      updateSpreadsheetProperties: {
        properties: {
          title: title,
        },
        fields: this.updateableFields.title,
      },
    }
  }

  private getUpdateSheetsHeadersRequests(spreadSheetId: string, headers: Headers): Promise<sheets_v4.Schema$Request[]> {
    return this.getSheets(spreadSheetId).then(sheets => sheets?.map(sheet => ({
      updateCells: {
        rows: [
          {
            values: headers.map((header) => ({
              userEnteredValue: { stringValue: header }
            })),
          }
        ],
        fields: this.updateableFields.custom,
        start: {
          sheetId: sheet.properties?.sheetId,
          rowIndex: 0, // Assuming headers are in the first row
          columnIndex: 0
        }
      }
    }))!)
  }

  public getSheetRange(sheetTitle: string, headers: Headers) {
    const unicodeOfFirstCellChar_A = 65
    const orderOfLastCellChar = headers.length - 1
    const lastCellCharByUnicode = String.fromCharCode(unicodeOfFirstCellChar_A + orderOfLastCellChar)
    return `${sheetTitle}!A1:${lastCellCharByUnicode}1`
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
}
