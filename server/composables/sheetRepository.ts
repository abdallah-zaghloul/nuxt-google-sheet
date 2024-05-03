import { Sheet as PrismaSheet } from "@prisma/client"
import { Sheet, GoogleSpreadSheet } from "../types"

const getter = (sheet: PrismaSheet): Sheet => sheet as Sheet

export default {
  create: (storeId: string, sheet: GoogleSpreadSheet) => prisma.sheet.create({
    data: { ...sheet, storeId }
  }).then(
    (sheet: PrismaSheet) => getter(sheet)
  ),

}