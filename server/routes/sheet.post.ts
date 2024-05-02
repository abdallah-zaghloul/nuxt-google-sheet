import googleService from "../composables/googleService"
import settingService from "../composables/settingService"
import sheetRepository from "../composables/sheetRepository"
import { SheetCreate } from "../types"

export default defineEventHandler(async (event) => {
  const sheet: SheetCreate = await readBody(event)
  const setting = await settingService.get(sheet.storeId)
  await sheetRepository.create(sheet)
  const createdGoogleSheet = await googleService.initClient(setting!).createSheet("test")
  console.log(createdGoogleSheet)
  return createdGoogleSheet
})
