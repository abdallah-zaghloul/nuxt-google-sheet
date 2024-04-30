import { Setting } from "../types";
import settingService from "../composables/settingService";
import googleService from "../composables/googleService";

export default defineEventHandler(async (event) => {
    const reqBody: Setting = await readBody(event)
    const setting = await settingService.set(reqBody.storeId, reqBody)

    if (!setting.isConnected) {
        await sendRedirect(event, googleService.initClient(setting).getAuthUrl())
    }
    
    return setting
});