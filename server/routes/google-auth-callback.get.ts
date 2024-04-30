import googleService from "../composables/googleService"
import settingService from "../composables/settingService"


export default defineEventHandler(async (event) => {
  const { state: storeId, code }: { state?: string, code?: string } = getQuery(event)
  const setting = await settingService.get(storeId!)

  try {
    const credentials = await googleService.initClient(setting!).authTokensByCode(code!)
    await settingService.toggleConnect(storeId!, setting!, true, credentials!)
    return await sendRedirect(event, process.env.YOUCAN_AUTH_CALLBACK_URL!)

  } catch (error) {
    await settingService.toggleConnect(storeId!, setting!, false)
    throw createError({
      statusCode: 400,
      statusMessage: "You have an issue connecting your google account"
    })
  }
})
