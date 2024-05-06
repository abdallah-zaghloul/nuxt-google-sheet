import { z } from "zod"
import { Headers, OrderId } from "./types"

const orderId: OrderId = "Order ID"
const allowedHeaders: Headers = [
    orderId,
    "SKU",
    "Vendor",
    "Total tax",
    "Order date",
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
    "Total charge",
    "Total coupon",
    "Total shipping fees",
    "Payment status",
    "Total discount",
    "Total quantity",
    "Payment gateway",
    "Shipping status",
    "Tracking number",
    "Product name",
    "Product URL",
    "Product variant",
    "Variant price",
    "Order customer currency",
    "Total with customer currency"
]

const headersSchema = z.array(
    z.enum(allowedHeaders)
).refine(
    headers => headers.includes(orderId), {
    message: `${orderId} header should exists`,
}).refine(
    headers => (new Set(headers)).size === headers.length, {
    message: `headers should be unique`
})

export const sheetCreateSchema = z.object({
    title: z.string().min(1).max(191),
    headers: headersSchema,
})
