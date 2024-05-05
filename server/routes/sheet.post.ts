import googleService from "../composables/googleService"
import settingService from "../composables/settingService"
import { sheetCreateSchema } from "../schemas"
import validator from "../utils/validator"
import { GoogleSpreadSheet } from "../types"
import sheetService from "../composables/sheetService"
import handler from "../utils/handler"

export default defineEventHandler((event) => handler.async(event, async () => {
  const reqBody = await validator.reqBody(sheetCreateSchema, event)
  const storeId = event.context.session?.storeId 
  ?? (await readBody(event)).storeId // for debug

  const setting = await settingService.get(storeId)
  const googleSpreadSheet: GoogleSpreadSheet = await googleService.initClient(setting!).createSpreadSheet(reqBody.title, reqBody.headers)
  return sheetService.create(storeId, googleSpreadSheet)
}))
