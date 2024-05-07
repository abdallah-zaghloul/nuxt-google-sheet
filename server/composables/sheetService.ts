import { GoogleSpreadSheet, PaginationQuery } from "../utils/types"
import sheetRepository from "./sheetRepository"


export default {
  create: (storeId: string, sheet: GoogleSpreadSheet) => sheetRepository.create(storeId, sheet),
  getAll: (storeId: string, paginationQuery: PaginationQuery) => sheetRepository.paginate(storeId, paginationQuery),
  get: (storeId: string, id: string) => sheetRepository.find(storeId, id)
}