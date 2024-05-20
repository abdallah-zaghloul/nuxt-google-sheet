import sheetService from "~/server/composables/sheetService"

export default defineEventHandler((event) => handler.sync(event, () => {
  return sheetService.getHeaders()
}))
