import { GoogleSpreadSheet } from "../utils/types"
import sheetRepository from "./sheetRepository"


export default {
  create: (storeId: string, sheet: GoogleSpreadSheet) => sheetRepository.create(storeId, sheet),
}