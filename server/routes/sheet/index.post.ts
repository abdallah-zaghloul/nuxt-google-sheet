import googleService from "../../composables/googleService"
import settingService from "../../composables/settingService"
import { sheetCreateSchema } from "../../utils/schemas"
import validator from "../../utils/validator"
import { GoogleSpreadSheet } from "../../utils/types"
import sheetService from "../../composables/sheetService"
import handler from "../../utils/handler"

export default defineEventHandler((event) => handler.async(event, async () => {
  const reqBody = await validator.reqBody(sheetCreateSchema, event)
  const storeId = helper.getStoreId(event)
  const setting = await settingService.get(storeId)
  const googleSpreadSheet: GoogleSpreadSheet | null = await googleService.initClient(setting!).createSpreadSheet(reqBody.title, reqBody.headers)
  return googleSpreadSheet ? sheetService.create(storeId, googleSpreadSheet) : handler.globalError(event)
}))
