import { Prisma, Setting as PrismaSetting } from "@prisma/client";
import { Setting } from "../types"

const getter = (setting: PrismaSetting) => (setting as Setting)
const setter = (setting: Setting) => ({
  storeId: setting.storeId,
  clientId: setting.clientId,
  clientSecret: setting.clientSecret,
  isConnected: setting.isConnected,
  credentials: setting.credentials as Prisma.JsonObject,
  email: setting.email,
  createdAt: setting.createdAt,
  updatedAt: setting.updatedAt,
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

  set: (storeId: string, setting: Setting) => {
    const data = setter(setting)
    return prisma.setting.upsert({
      where: { storeId },
      create: data,
      update: data
    }).then(
      setting => getter(setting),
    )
  },
}