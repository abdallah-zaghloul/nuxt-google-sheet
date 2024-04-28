import { Setting } from "@prisma/client";

const toggleConnectQuery = (storeId: string, isConnected: boolean, token?: string) => {
  const tokens = token ? `JSON_ARRAY_APPEND(tokens, '$', ${token})` : `[]`
  return prisma.$executeRaw`UPDATE Setting 
         SET tokens = ${tokens},
         isConnected = ${isConnected} 
         WHERE storeId = ${storeId};`
}

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

  toggleConnect: (storeId: string, isConnected: boolean, token?: string) => toggleConnectQuery(
    storeId, isConnected, token
  ).then(() => prisma.setting.findUnique({ where: { storeId } }))


}