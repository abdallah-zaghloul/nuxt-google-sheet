import crypto from "node:crypto";
import googleService from "~/server/composables/googleService";
import settingService from "~/server/composables/settingService";
import sheetService from "~/server/composables/sheetService";
import { OrderEvent } from "~/server/utils/types";

//should separated at server handler middleware
//compare signature
function isValidYouCanSignature(signature: string, payload: object): boolean {
  const expectedSignature = hmac(JSON.stringify(payload));
  return crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature));
}

export default defineEventHandler((event) => handler.async(async () => {
  const reqBody: OrderEvent = await readBody(event)
  const headerSignature = getHeader(event, 'x-youcan-signature')!
  // isValidYouCanSignature(headerSignature, reqBody)

  const setting = await settingService.get(reqBody.store_id)
  const googleClientService = googleService.initClient(setting!)
  const syncableSheets = await sheetService.getSyncables(reqBody.store_id)

  return Promise.allSettled(
    syncableSheets.map(sheet => googleClientService.appendOrderToSheet(sheet.googleId, reqBody, sheet.headers))
  )

}))
