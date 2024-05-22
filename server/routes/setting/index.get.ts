import settingService from "../../composables/settingService";

export default defineEventHandler((event) => handler.async(event, async () => {
    const storeId = helper.getStoreId(event)
    return await settingService.get(storeId)
}))