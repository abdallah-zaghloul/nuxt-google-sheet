import googleService from "../composables/googleService"
import settingService from "../composables/settingService"


export default defineEventHandler((event) => handler.async(event, async () => {
  const { state: storeId, code }: { state?: string, code?: string } = getQuery(event)
  const setting = await settingService.get(storeId!)
  const googleClientService = googleService.initClient(setting!)
  const credentials = await googleClientService.authTokensByCode(code!)
  const email = await googleClientService.getEmail()
  await settingService.toggleConnect(storeId!, setting!, true, credentials!, email!)
  return sendRedirect(event, process.env.YOUCAN_AUTH_CALLBACK_URL!)
},
  //catcher cancel connect to google
  async () => {
    const { state: storeId }: { state?: string } = getQuery(event)
    
    if (!storeId)
      return handler.globalError(event)

    const setting = await settingService.get(storeId!)
    await settingService.toggleConnect(storeId!, setting!, false)
    return handler.globalError(event)
  }
))
