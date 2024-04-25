import settingService from "../composables/settingService";

export default defineEventHandler(async (event) => {
    const storeId = event.context.session?.storeId
    return await settingService.get(storeId)
});