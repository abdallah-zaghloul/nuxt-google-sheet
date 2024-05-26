import sheetService from "~/server/composables/sheetService"
import { PaginationQuery } from "~/server/utils/types"


export default defineEventHandler((event) => handler.async(async () => {
  const paginationQuery: PaginationQuery = validator.reqQuery(paginationQuerySchema, event)
  return sheetService.getAll(helper.getStoreId(), paginationQuery)
}))
