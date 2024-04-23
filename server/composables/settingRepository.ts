export default {
  get: async (storeId: string) => await prisma.setting.findUnique({
    where: { storeId }
  }).catch((error: any) => null),
  
  set: async (storeId: string, setting: typeof prisma.setting) => await prisma.setting.upsert({
    where: { storeId },
    //@ts-ignore
    create: setting,
    update: setting
  })
}