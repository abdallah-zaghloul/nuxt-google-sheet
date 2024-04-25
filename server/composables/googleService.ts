import { google } from "googleapis"
import { Setting } from "@prisma/client"

const getOAuth2Client = (setting: Setting) => new google.auth.OAuth2({
  clientId: setting?.clientId,
  clientSecret: setting?.clientSecret,
  // redirectUri: process.env.NUXT_YOUCAN_API_REDIRECT,
  redirectUri: process.env.GOOGLE_APP_REDIRECT_URL
})

const getAuthUrl = (setting: Setting) => getOAuth2Client(setting).generateAuthUrl({
  access_type: 'offline',
  state: setting?.storeId,
  scope: [
    'https://www.googleapis.com/auth/userinfo.email', //user email info permission
    'https://www.googleapis.com/auth/spreadsheets' //spreedsheet permission
  ],
})

export default {
  getOAuth2Client,
  getAuthUrl
}