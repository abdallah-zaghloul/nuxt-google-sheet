import { Prisma, Setting as PrismaSetting } from "@prisma/client";
import { Credentials, Setting, SettingReq } from "../utils/types"

const getter = (setting: PrismaSetting) => (setting as Setting)
const setter = (storeId: string, setting: Setting | SettingReq & { credentials?: Credentials | null }) => ({
  ...setting,
  credentials: setting.credentials as Prisma.JsonObject,
  storeId: storeId
})

export default {
  get: (storeId: string) => {
    return prisma.setting.findUnique({
      where: { storeId }
    }).then(
      //@ts-ignore
      setting => getter(setting),
      notfound => null
    )
  },

  set: (storeId: string, setting: Setting | SettingReq & { credentials?: Credentials | null }) => {
    const data = setter(storeId, setting)
    return prisma.setting.upsert({
      where: { storeId },
      create: data,
      update: data
    }).then(
      setting => getter(setting),
    )
  },

  update: (storeId: string, setting: Partial<Setting>) => {
    setting.credentials && setting.credentials as Prisma.JsonObject
    return prisma.setting.update({
      where: { storeId },
      //@ts-ignore
      data: setting
    }).then(
      setting => getter(setting),
    )
  }
}