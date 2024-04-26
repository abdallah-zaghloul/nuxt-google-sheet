import { Setting } from "@prisma/client";

export default {
  get: (storeId: string) => prisma.setting.findUnique({
    where: { storeId }
  }).catch((error: any) => null),

  set: (storeId: string, setting: Setting) => prisma.setting.upsert({
    where: { storeId },
    //@ts-ignore
    create: setting,
    update: setting
  }),

  toggleConnect: (storeId: string, isConnected: boolean) => prisma.setting.update({
    where: { storeId },
    data: { isConnected }
  }),
}