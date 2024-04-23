import settingService from "../composables/settingService";

export default defineEventHandler(async (event) => {
    const setting: typeof prisma.setting = await readBody(event)
    return await settingService.set(setting.storeId, setting)
});