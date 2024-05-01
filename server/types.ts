import { Auth } from "googleapis"
import { Session } from "@prisma/client"

export type Credentials = Auth.Credentials;

export type Client = Auth.OAuth2Client

export type Setting = {
    storeId: string
    clientId: string,
    clientSecret: string
    isConnected: boolean
    credentials?: Credentials,
    createdAt: Date,
    updatedAt: Date,
}

export type { Session }

export type Field = 'Order ID' & (
    | 'SKU'
    | 'Vendor'
    | 'Total tax'
    | 'Order date'
    | 'First name'
    | 'Last name'
    | 'Full name'
    | 'Email'
    | 'Phone'
    | 'Country'
    | 'Region'
    | 'City'
    | 'Address city'
    | 'Address state'
    | 'Address country'
    | 'Address currency'
    | 'Address zip code'
    | 'Address 1'
    | 'Address 2'
    | 'Full address'
    | 'Total charge'
    | 'Total coupon'
    | 'Total shipping fees'
    | 'Payment status'
    | 'Total discount'
    | 'Total quantity'
    | 'Payment gateway'
    | 'Shipping status'
    | 'Tracking number'
    | 'Product name'
    | 'Product URL'
    | 'Product variant'
    | 'Variant price'
    | 'Order customer currency'
    | 'Total with customer currency'
)

export type Fields = Set<Field>;

export type Sheet = {
    id: string
    storeId: string
    name: string,
    fields: Fields
    isActive: boolean
    createdAt: Date,
    updatedAt: Date,
}

export type SheetCreate = Pick<Sheet, 'storeId'|'name'|'fields'>