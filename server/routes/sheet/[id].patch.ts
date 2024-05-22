import googleService from "~/server/composables/googleService"
import settingService from "~/server/composables/settingService"
import sheetService from "~/server/composables/sheetService"
import { sheetUpdateSchema, uuidSchema } from "~/server/utils/schemas"
import { SheetUpdate } from "~/server/utils/types"


export default defineEventHandler((event) => handler.async(event, async () => {
  const id = validator.routeParam(uuidSchema, event, 'id')
  const storeId = getStoreId(event)
  const sheet = await sheetService.get(storeId, id)!
  const reqBody: SheetUpdate = await validator.reqBody(sheetUpdateSchema(sheet!), event)
  const setting = await settingService.get(storeId)
  const googleSpreadSheet = await googleService.initClient(setting!).updateSpreadSheet(sheet!.googleId, reqBody.title!, reqBody.headers!)
  return googleSpreadSheet ? sheetService.update(storeId, id, reqBody) : handler.globalError(event)
}))
