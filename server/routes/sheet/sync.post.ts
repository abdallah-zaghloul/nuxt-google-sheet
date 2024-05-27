import youcanService from "~/server/composables/youcanService"

export default defineEventHandler(() => handler.async(async () => {
  const youCanService = youcanService.init(await helper.getSession())
  await youCanService.unSubscribeCreatedOrderSubs()
  await youCanService.subscribeCreatedOrder() || handler.globalError()
  return youCanService.listCreatedOrderSubs()
}))
