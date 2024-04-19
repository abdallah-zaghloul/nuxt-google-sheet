import prisma from '~/prisma/singleton'

export default defineEventHandler(async (event) => {
    const reqBody: typeof prisma.setting = await readBody(event)
    if (! reqBody.isConnected){
        //connect google client
    }
    const setting = await prisma.setting.upsert({
        where: {
            storeId: reqBody.storeId
        },
        update: reqBody,
        create: reqBody
    })
    return setting
});