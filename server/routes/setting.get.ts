import settingService from "../composables/settingService";

export default defineEventHandler(async (event) => {
    const storeId = event.context.session?.storeId
    const setting = await settingService.get(storeId)

    return {
        storeId,
        setting
    }
});