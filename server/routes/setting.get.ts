import prisma from '~/prisma/singleton'

export default defineEventHandler(async (event) =>
    await prisma.setting.findUnique({
        where: {
            storeId: event.context.session?.storeId
        }
    }).catch((error: any) => null)
);