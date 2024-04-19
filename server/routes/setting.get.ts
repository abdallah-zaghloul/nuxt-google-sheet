import prisma from '~/prisma/singleton'

export default defineEventHandler(async (event) => {
    const storeId = event.context.session?.storeId
    const setting = await prisma.setting.findUnique({
        where: {
            storeId
        }
    }).catch((error: any) => null)

    return {
        storeId,
        setting
    }
});