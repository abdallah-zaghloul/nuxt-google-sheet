import { Sheet as PrismaSheet } from "@prisma/client"
import { Sheet, GoogleSpreadSheet, PaginationQuery, SheetUpdate } from "../utils/types"

const getter = (sheet: PrismaSheet): Sheet => sheet as Sheet

export default {
  create: (storeId: string, sheet: GoogleSpreadSheet) => prisma.sheet.create({
    data: { ...sheet, storeId }
  }).then(
    (sheet: PrismaSheet) => getter(sheet)
  ),

  paginate: (storeId: string, paginationQuery: PaginationQuery) => prisma.sheet.findMany({
    take: paginationQuery.take,
    skip: paginationQuery.skip,
    where: { storeId },
    orderBy: {
      createdAt: 'desc'
    }
  }).then(sheets => sheets.map(sheet => getter(sheet))),

  find: (storeId: string, id: string) => prisma.sheet.findUnique({
    where: {
      storeId,
      id
    }
  }).then(
    (sheet: PrismaSheet | null) => sheet ? getter(sheet) : null,
  ),

  delete: (storeId: string, id: string) => prisma.sheet.delete({
    where: {
      storeId,
      id
    }
  }).then(
    deleted => true,
    failed => false
  ),

  update: (storeId: string, id: string, data: SheetUpdate) => prisma.sheet.update({
    where: {
      storeId,
      id
    },
    data: data
  }).then(
    (sheet: PrismaSheet) => getter(sheet)
  )
}