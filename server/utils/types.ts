import { Auth } from "googleapis"
import { Session } from "@prisma/client"

export type Credentials = Auth.Credentials;

export type Client = Auth.OAuth2Client

export type Setting = {
    storeId: string
    clientId: string,
    clientSecret: string
    isConnected?: boolean
    credentials?: Credentials | null,
    email?: string,
    createdAt: Date,
    updatedAt: Date,
}
export type SettingReq = Pick<Setting, "clientId" | "clientSecret" | "isConnected">

export type { Session }

export type OrderId = "Order ID"
export type Header = (
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

export type Headers = [OrderId] & Header[]

export type Sheet = {
    id: string
    storeId: string
    title: string,
    headers: Headers
    status: boolean
    googleId: string
    googleUrl: string
    createdAt: Date,
    updatedAt: Date,
}

export type GoogleSpreadSheet = Pick<Sheet, 'title' | 'headers' | 'googleId' | 'googleUrl'>

export type SheetUpdate = Partial<Pick<Sheet, 'title' | 'headers' | 'status'>>

export type UserProfileInfo = {
    sub: string,
    picture: string,
    email: string,
    email_verified: boolean
}

export type PaginationQuery = {
    skip?: number,
    take?: number
}

