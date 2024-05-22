import { z } from "zod"
import { Headers, OrderId, Sheet } from "./types"

const orderId: OrderId = "Order ID"
export const allowedHeaders: Headers = [
    orderId,
    "First name",
    "Last name",
    "Full name",
    "Email",
    "Phone",
    "Country",
    "Region",
    "City",
    "Address city",
    "Address state",
    "Address country",
    "Address currency",
    "Address zip code",
    "Address 1",
    "Address 2",
    "Full address",
    "Total tax",
    "Order date",
    "Total charge",
    "Total shipping fees",
    "Payment status",
    "Total discount",
    "Total quantity",
    "Shipping status",
    "Tracking number",
    "Variant price",
    "Order customer currency",
    "Total with customer currency",
    //missing
    "SKU",
    "Vendor",
    "Total coupon",
    "Payment gateway",
    "Product name",
    "Product URL",
    "Product variant",
]

const headersSchema = z.array(
    z.enum(allowedHeaders, {
        message: `please insert allowed header field names`
    })
).refine(
    headers => headers.includes(orderId), {
    message: `${orderId} header should exists`,
}).refine(
    headers => (new Set(headers)).size === headers.length, {
    message: `headers should be unique`
})

export const uuidSchema = z.string().uuid()

export const paginationQuerySchema = z.object({
    skip: z.coerce.number().min(0).optional(),
    take: z.coerce.number().min(1).max(Number(process.env.PAGINATION_COUNT) ?? 1000)
})

export const settingSchema = z.object({
    clientId: z.string().min(1).max(191),
    clientSecret: z.string().min(1).max(191),
    isConnected: z.boolean()
})

export const sheetCreateSchema = z.object({
    title: z.string().min(1).max(191),
    headers: headersSchema,
})

export const sheetUpdateSchema = (sheet: Sheet) => z.object({
    title: z.string().min(1).max(191).optional(),
    headers: headersSchema.optional(),
    status: z.boolean().optional()
}).refine(
    data => Object.keys(data).length > 0, {
    message: `at least one input required`,
}).transform(
    data => ({
        title: data.title ?? sheet.title,
        headers: data.headers ? sheet.headers.concat(data.headers.filter(header => !sheet.headers.includes(header))) : sheet.headers,
        status: data.status ?? sheet.status,
    })
)
