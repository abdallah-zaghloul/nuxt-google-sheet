import youcanService from "~/server/composables/youcanService"
import { bulkSyncOrdersSchema } from "~/server/utils/schemas"

export default defineEventHandler((event) => handler.async(async () => {
  const reqBody = await validator.reqBody(bulkSyncOrdersSchema, event)
  return youcanService.init(await helper.getSession()).ordersByRef(reqBody.orderRefs)
}))
