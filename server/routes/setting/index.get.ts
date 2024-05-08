import settingService from "../../composables/settingService";
import getStoreId from "../../utils/getStoreId";

export default defineEventHandler((event) => handler.async(event, async () => {
    const storeId = getStoreId(event)
    return await settingService.get(storeId)
}))