import settingService from "../../composables/settingService";

export default defineEventHandler(() => handler.async(async () => {
    const storeId = helper.getStoreId()
    return await settingService.get(storeId)
}))