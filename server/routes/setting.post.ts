import { Setting } from "@prisma/client";
import settingService from "../composables/settingService";
import { navigateTo } from "nuxt/app";
import googleService from "../composables/googleService";

export default defineEventHandler(async (event) => {
    const reqBody: Setting = await readBody(event)
    const setting = await settingService.set(reqBody.storeId, reqBody)
    return !setting.isConnected ? await sendRedirect(event, googleService.getAuthUrl(setting)) : setting
});