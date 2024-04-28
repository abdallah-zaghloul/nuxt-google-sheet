import { Setting } from "@prisma/client";
import settingRepository from "./settingRepository";

export default {
  get: (storeId: string) => settingRepository.get(storeId),
  set: (storeId: string, setting: Setting) => settingRepository.set(storeId, setting),
  toggleConnect: (storeId: string, isConnected: boolean, token?: string) => settingRepository.toggleConnect(storeId, isConnected, token)
}