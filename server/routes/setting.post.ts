import { SettingReq } from "../types";
import settingService from "../composables/settingService";
import googleService from "../composables/googleService";
import { settingSchema } from "../schemas";

export default defineEventHandler((event) => handler.async(event, async () => {
    const storeId = event.context.session?.storeId
    const { clientId, clientSecret, isConnected }: SettingReq = await validator.reqBody(settingSchema, event)

    if (isConnected) {
        const setting = await settingService.set(storeId, { clientId, clientSecret })
        await sendRedirect(event, googleService.initClient(setting).getAuthUrl())
    }

    return settingService.disconnect(storeId)
}))
