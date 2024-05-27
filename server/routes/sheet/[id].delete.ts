import sheetService from "~/server/composables/sheetService"
import { uuidSchema } from "~/server/utils/schemas"


export default defineEventHandler((event) => handler.async(async () => {
  const id = validator.routeParam(uuidSchema, event, 'id')
  return await sheetService.delete(helper.getStoreId(), id) || handler.notFoundError()
}))
