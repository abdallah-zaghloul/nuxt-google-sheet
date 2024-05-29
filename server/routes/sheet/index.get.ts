import sheetService from "~/server/composables/sheetService"
import youcanService from "~/server/composables/youcanService"
import { PaginationQuery } from "~/server/utils/types"


export default defineEventHandler((event) => handler.async(async () => {
  const paginationQuery: PaginationQuery = validator.reqQuery(paginationQuerySchema, event)
  const session = await helper.getSession()
  await youcanService.init(session).syncOrders()
  return sheetService.getAll(session.storeId, paginationQuery)
}))
