/**
 * global singleton prisma instance implementation at TypeScript
 * --------------------------------------------------------------
 * import {PrismaClient} from "@prisma/client";
 * declare global {var prisma: PrismaClient}
 * global.prisma ??= (new PrismaClient());
 * export default global.prisma as PrismaClient;
 */

/**
 * exported from the ready global instance founded at:
 * const prisma: typeof import('../../youcan/server/utils/database')['prisma']
 *
 */
export default prisma;
