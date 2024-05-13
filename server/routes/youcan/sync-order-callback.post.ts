import youcanService from "~/server/composables/youcanService"
import getCurrentSession from "~/server/utils/getCurrentSession"

export default defineEventHandler((event) => handler.async(event, async () => {
  return await youcanService.init(await getCurrentSession(event)).listSubscriptions()
}))
