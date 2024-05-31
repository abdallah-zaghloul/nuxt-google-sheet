import googleService from "../../../composables/googleService"
import settingService from "../../../composables/settingService"


export default defineEventHandler((event) => handler.async(async () => {
  const { state: storeId, code: authCode }: { state?: string, code?: string } = getQuery(event)
  const setting = await settingService.get(storeId!)
  await googleService.initClient(setting!, authCode)
  return sendRedirect(event, process.env.YOUCAN_AUTH_CALLBACK_URL!)
},
  //catcher cancel connect to google
  async () => {
    const { state: storeId }: { state?: string } = getQuery(event)

    if (!storeId)
      return handler.globalError()

    await settingService.disconnect(storeId!)
    return handler.globalError()
  }
))
