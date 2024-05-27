import { Credentials, Setting, SettingReq } from "../utils/types";
import settingRepository from "./settingRepository";


export default {
  get: (storeId: string) => settingRepository.get(storeId),

  set: (storeId: string, setting: Setting | SettingReq) => settingRepository.set(storeId, setting),

  connect: (storeId: string, credentials: Credentials, email?: string) => settingRepository.update(storeId, {
    isConnected: true,
    credentials: credentials,
    email: email
  }),

  disconnect: (storeId: string) => settingRepository.update(storeId, {
    credentials: null,
    isConnected: false
  }),
}