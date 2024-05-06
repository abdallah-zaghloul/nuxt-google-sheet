import { Credentials, Setting } from "../types";
import settingRepository from "./settingRepository";


export default {
  get: (storeId: string) => settingRepository.get(storeId),
  set: (storeId: string, setting: Setting) => settingRepository.set(storeId, setting),
  toggleConnect: (storeId: string, setting: Setting, isConnected: boolean, credentials?: Credentials, email?: string) => {
    setting.isConnected = isConnected
    setting.credentials = credentials ?? setting.credentials
    setting.email = email ?? setting.email
    return settingRepository.set(storeId, setting)
  }
}