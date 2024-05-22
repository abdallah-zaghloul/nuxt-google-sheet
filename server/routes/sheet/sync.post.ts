import youcanService from "~/server/composables/youcanService"
import getCurrentSession from "~/server/utils/getCurrentSession"

export default defineEventHandler((event) => handler.async(event, async () => {
  const youCanService = youcanService.init(await getCurrentSession(event))
  await youCanService.unSubscribeCreatedOrderSubs()
  await youCanService.subscribeCreatedOrder() || handler.globalError(event)
  return youCanService.listCreatedOrderSubs()
}))
