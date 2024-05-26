import { SettingReq } from "../../utils/types";
import settingService from "../../composables/settingService";
import googleService from "../../composables/googleService";
import { settingSchema } from "../../utils/schemas";

export default defineEventHandler((event) => handler.async(async () => {
    const storeId = helper.getStoreId()
    const { clientId, clientSecret, isConnected }: SettingReq = await validator.reqBody(settingSchema, event)

    if (isConnected) {
        const setting = await settingService.set(storeId, { clientId, clientSecret })
        await sendRedirect(event, googleService.initClient(setting).getAuthUrl())
    }

    return settingService.disconnect(storeId)
}))
