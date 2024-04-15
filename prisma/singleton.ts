import {PrismaClient} from "@prisma/client";
// @ts-ignore
global.prisma ??= (new PrismaClient());
// @ts-ignore
// const prisma: PrismaClient = global.prisma
// Object.freeze(global.prisma)
export default global.prisma as PrismaClient