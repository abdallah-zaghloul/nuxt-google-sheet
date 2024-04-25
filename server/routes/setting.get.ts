import settingService from "../composables/settingService";
import googleService from "../composables/googleService";


export default defineEventHandler(async (event) => {
    const storeId = event.context.session?.storeId
    const setting = await settingService.get(storeId)
    const url = googleService.getAuthUrl(setting!)
    console.log(url)
    return setting
});