import googleService from "../composables/googleService"
import settingService from "../composables/settingService"
import sheetRepository from "../composables/sheetRepository"

export default defineEventHandler(async (event) => {
  const reqBody = await readBody(event)
  const storeId = event.context.session?.storeId ?? reqBody.storeId //for debugging

  const setting = await settingService.get(storeId)
  const googleSpreadSheet = await googleService.initClient(setting!).createSpreadSheet(reqBody.title, reqBody.headers)
  return sheetRepository.create(storeId, googleSpreadSheet)
})
