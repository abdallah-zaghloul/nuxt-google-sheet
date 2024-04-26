import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const setting = {
    storeId: 'e8db3f50-6531-4607-b1f7-ae53c739840c',
    clientId: '886928372155-o6v47q96b8n45bhegntj0p5rptgvl5u8.apps.googleusercontent.com',
    clientSecret: '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',
}

async function main() {
    await prisma.setting.upsert({
        where: { storeId: setting.storeId },
        create: setting,
        update: setting
    }).catch((error: any) => {
        console.log(error)
        process.exit(1)
    }).finally(() => prisma.$disconnect())
}

main()