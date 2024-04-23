import settingRepository from "./settingRepository";

export default {
  get: async (storeId: string) => await settingRepository.get(storeId),
  set: async (storeId: string, setting: typeof prisma.setting) => await settingRepository.set(storeId, setting),
}