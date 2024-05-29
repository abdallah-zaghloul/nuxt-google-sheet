import googleService from "~/server/composables/googleService"
import settingService from "~/server/composables/settingService"
import sheetService from "~/server/composables/sheetService"
import youcanService from "~/server/composables/youcanService"
import { bulkSyncOrdersSchema } from "~/server/utils/schemas"

export default defineEventHandler((event) => handler.async(async () => {
  const reqBody = await validator.reqBody(bulkSyncOrdersSchema, event)
  const session = await helper.getSession()
  const setting = await settingService.get(session.storeId)
  const orders = await youcanService.init(session).ordersByRef(reqBody.orderRefs)

  const sheet = await sheetService.get(session.storeId, reqBody.sheetId) ?? handler.notFoundError()
  return googleService.initClient(setting!).appendOrdersToSheet(sheet?.googleId!, sheet?.headers!, ...orders)
}))
