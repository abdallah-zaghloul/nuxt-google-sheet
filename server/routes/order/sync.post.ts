import youcanService from "~/server/composables/youcanService"
import getCurrentSession from "~/server/utils/getCurrentSession"

export default defineEventHandler((event) => handler.async(event, async () => {
  const youCanService = youcanService.init(await getCurrentSession(event))
  return await youCanService.subscribeCreatedOrder()
}))
