import { Setting } from "@prisma/client";
import settingService from "../composables/settingService";

export default defineEventHandler(async (event) => {
    const setting: Setting = await readBody(event)
    return await settingService.set(setting.storeId, setting)
});