import googleService from "../composables/googleService"
import settingService from "../composables/settingService"


export default defineEventHandler(async (event) => {
  const { state: storeId, code }: { state?: string, code?: string } = getQuery(event)

  if (storeId && code) {

    const setting = await settingService.get(storeId)
    const googleClientService = googleService.initClient(setting)
    settingService.toggleConnect(storeId, true)
    return await sendRedirect(event, process.env.YOUCAN_AUTH_CALLBACK_URL)
  } else {
    //error logic
    return await sendRedirect(event, process.env.YOUCAN_AUTH_CALLBACK_URL)
  }
})
