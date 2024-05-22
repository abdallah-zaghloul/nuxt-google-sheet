import youcanService from "~/server/composables/youcanService"

export default defineEventHandler((event) => handler.async(event, async () => {
  const youCanService = youcanService.init(await helper.getSession(event))
  await youCanService.unSubscribeCreatedOrderSubs()
  await youCanService.subscribeCreatedOrder() || handler.globalError(event)
  return youCanService.listCreatedOrderSubs()
}))
