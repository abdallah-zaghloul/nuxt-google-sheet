import { Credentials, Setting, SettingReq } from "../types";
import settingRepository from "./settingRepository";


export default {
  get: (storeId: string) => settingRepository.get(storeId),

  set: (storeId: string, setting: Setting | SettingReq) => settingRepository.set(storeId, setting),

  connect: (storeId: string, setting: Setting | SettingReq, credentials: Credentials, email: string) => settingRepository.set(storeId, {
    ...setting,
    isConnected: true,
    credentials: credentials,
    email: email
  }),

  disconnect: (storeId: string) => settingRepository.update(storeId, {
    credentials: null,
    isConnected: false
  }),
}