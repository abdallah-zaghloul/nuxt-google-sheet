import { Prisma, Sheet as PrismaSheet } from "@prisma/client"
import { Sheet, SheetCreate } from "../types"

const getter = (sheet: PrismaSheet): Sheet => ({
  ...sheet,
  fields: new Set(sheet.fields as Prisma.JsonArray),
})

const setter = (sheet: Sheet | SheetCreate) => ({
  ...sheet,
  fields: Array.from(sheet.fields)
})

export default {
  create: (sheet: SheetCreate) => prisma.sheet.create({
    data: setter(sheet)
  }).then(
    (sheet: PrismaSheet) => getter(sheet)
  ),

}