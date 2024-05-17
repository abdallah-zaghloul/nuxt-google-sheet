import getCurrentSession from "~/server/utils/getCurrentSession"
import crypto from "node:crypto";
import googleService from "~/server/composables/googleService";
import settingService from "~/server/composables/settingService";
import sheetService from "~/server/composables/sheetService";

//should separated at server handler middleware
//compare signature
function isValidYouCanSignature(signature: string, payload: object): boolean {
  const expectedSignature = hmac(JSON.stringify(payload));
  return crypto.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature));
}

export default defineEventHandler((event) => handler.async(event, async () => {
  const reqBody: CreateOrderEvent = await readBody(event)
  const headerSignature = getHeader(event, 'x-youcan-signature')!
  // isValidYouCanSignature(headerSignature, reqBody)

  const setting = await settingService.get(reqBody.store_id)
  const googleClientService = googleService.initClient(setting!)
  const sheet = (await sheetService.getAll(reqBody.store_id, { take: 20 })).at(0)
  const updateRes = await googleClientService.orderEventToSheetRow(reqBody)

  console.log({
    setting,
    sheet,
    updateRes
  })

}))
