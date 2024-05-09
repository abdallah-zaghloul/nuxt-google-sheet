import settingService from "~/server/composables/settingService"
import sheetService from "~/server/composables/sheetService"
import { sheetUpdateSchema, uuidSchema } from "~/server/utils/schemas"
import { SheetUpdate } from "~/server/utils/types"


export default defineEventHandler((event) => handler.async(event, async () => {
  const id = validator.routeParam(uuidSchema, event, 'id')
  const reqBody: SheetUpdate = await validator.reqBody(sheetUpdateSchema, event)
  const storeId = getStoreId(event)
  const setting = await settingService.get(storeId)
  return sheetService.update(storeId, id, reqBody)
}))
