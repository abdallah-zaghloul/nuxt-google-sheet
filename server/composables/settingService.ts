import { Setting } from "../types";
import settingRepository from "./settingRepository";
import { Auth } from "googleapis";


export default {
  get: (storeId: string) => settingRepository.get(storeId),
  set: (storeId: string, setting: Setting) => settingRepository.set(storeId, setting),
  toggleConnect: (storeId: string, setting: Setting, isConnected: boolean, credentials?: Auth.Credentials) => {
    setting.isConnected = isConnected
    credentials && (setting.credentials = credentials)
    return settingRepository.set(storeId, setting)
  }
}