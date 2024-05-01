import { google } from "googleapis"
import { Client, Setting, Credentials } from "../types"

export default class googleService {

  private static instance?: googleService
  private client: Client
  private setting: Setting

  //singleton
  public static initClient(setting: Setting) {
    return googleService.instance ??= (new googleService(setting))
  }

  //singleton private constructor
  private constructor(setting: Setting) {
    this.setting = setting
    this.client = (new google.auth.OAuth2({
      clientId: this.setting.clientId,
      clientSecret: this.setting.clientSecret,
      redirectUri: process.env.GOOGLE_AUTH_CALLBACK_URL
    }))
  }

  public getClient(): Client {
    return this.client
  }

  public getAuthUrl() {
    return this.client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      state: this.setting.storeId,
      scope: [
        'https://www.googleapis.com/auth/userinfo.email', //user email info permission
        'https://www.googleapis.com/auth/spreadsheets' //spreedsheet permission
      ]
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
}
