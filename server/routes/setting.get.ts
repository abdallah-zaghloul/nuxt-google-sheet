import settingService from "../composables/settingService";

export default defineEventHandler((event) => handler.async(event, async () => {
    const storeId = event.context.session?.storeId
    return await settingService.get(storeId)
}))