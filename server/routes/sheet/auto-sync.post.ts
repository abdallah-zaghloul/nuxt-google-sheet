import youcanService from "~/server/composables/youcanService"

export default defineEventHandler(() => handler.async(async () => {
  return youcanService.init(await helper.getSession()).syncOrders()
}))
