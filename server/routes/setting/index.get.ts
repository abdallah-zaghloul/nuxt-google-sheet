import settingService from "../../composables/settingService";

export default defineEventHandler((event) => handler.async(event, async () => {
    const storeId = helper.getStoreId()
    return await settingService.get(storeId)
}))