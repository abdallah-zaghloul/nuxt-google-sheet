import { GoogleSpreadSheet, PaginationQuery, SheetUpdate } from "../utils/types"
import sheetRepository from "./sheetRepository"
import { allowedHeaders } from "~/server/utils/schemas"


export default {
  create: (storeId: string, sheet: GoogleSpreadSheet) => sheetRepository.create(storeId, sheet),
  getAll: (storeId: string, paginationQuery: PaginationQuery) => sheetRepository.paginate(storeId, paginationQuery),
  get: (storeId: string, id: string) => sheetRepository.find(storeId, id),
  delete: (storeId: string, id: string) => sheetRepository.delete(storeId, id),
  update: (storeId: string, id: string, sheet: SheetUpdate) => sheetRepository.update(storeId, id, sheet),
  getHeaders: () => allowedHeaders
}