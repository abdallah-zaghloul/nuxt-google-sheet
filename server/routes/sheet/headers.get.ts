import sheetService from "~/server/composables/sheetService"

export default defineEventHandler(() => handler.sync(() => {
  return sheetService.getHeaders()
}))
