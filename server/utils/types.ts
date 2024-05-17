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
  /* customer */
  | "First name"
  | "Last name"
  | "Full name"
  | "Email"
  | "Phone"
  | "Country"
  | "Region"
  | "City"
  | "Address city"
  | "Address state"
  | "Address country"
  | "Address currency"
  | "Address zip code"
  | "Address 1"
  | "Address 2"
  | "Full address"
  /* order */
  | "SKU" /* Stock Keeping Unit */
  | "Vendor"
  | "Total tax"
  | "Order date"
  | "Total charge"
  | "Total coupon"
  | "Total shipping fees"
  | "Payment status"
  | "Total discount"
  | "Total quantity"
  | "Payment gateway"
  | "Shipping status"
  | "Tracking number"
  | "Product name"
  | "Product URL"
  | "Product variant"
  | "Variant price"
  | "Order customer currency"
  | "Total with customer currency"
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

export type GoogleSpreadSheet = Pick<Sheet, "title" | "headers" | "googleId" | "googleUrl">

export type SheetUpdate = Partial<Pick<Sheet, "title" | "headers" | "status">>

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

export type YouCanWebhookSub = {
  target_url: string,
  event: string
}

export type YouCanWebhookUnSub = {
  message: string,
  type: string
}

export type YouCanWebhookSubs = (YouCanWebhookSub & { id: string })[]

export type CreateOrderEvent = {
  id: string  /* "a2838db5-5b28-44a1-93f2-49d9aceee367" */,
  ref: `${number}` /* "002" */,
  vat: number /* 0 */,
  total: number  /* 200 */,
  currency: string /* "USD" */,
  store_id: string /* "e8db3f50-6531-4607-b1f7-ae53c739840c" */,
  customer_currency_rate: null,
  notes: any,
  status: number /* 1 */,
  status_new: string /* "open" */,
  is_refunded_by_platform: boolean //false,
  platform_fee: number /* 0 */,
  payment_status: number /* 2 */,
  payment_status_new: string /* "unpaid" */,
  created_at: Date /* "2024-05-15T15:48:49+00:00" */,
  updated_at: Date /* "2024-05-15T15:48:49+00:00" */,
  tags: [],
  extra_fields: any,
  custom_fields: [],
  status_object: {
    slug: string /* "open" */,
    name: string /* "open" */,
    color: string /* "#AC4765FF" */
  },
  customer_currency: {
    name: string /* "US Dollar" */,
    code: string /* "USD" */,
    symbol: string /* "$" */,
    major_value: `${number}` /* "0.01" */,
    conversion_rate_base_usd: number /* 1 */,
    created_at: Date /* "2019-11-27 13:05:44" */,
    updated_at: Date /* "2023-02-01 00:00:08" */,
    deleted_at: Date | null,
    conversion_rate_last_updated_at: Date /* "2023-02-01 00:00:08" */
  },
  links: {
    self: string /* "http://seller-area.youcanshop.dev/admin/orders/a2838db5-5b28-44a1-93f2-49d9aceee367" */,
    edit: string /* "http://seller-area.youcanshop.dev/admin/orders/a2838db5-5b28-44a1-93f2-49d9aceee367/edit" */
  },
  payment: {
    status_text: string /* "unpaid" */,
    status_object: [object],
    status: number /* 2 */,
    created_at: Date /* "2024-05-15 15:48" */,
    updated_at: Date /* "2024-05-15 15:48" */
  },
  shipping: {
    shipping_zone_id: string /* "2a1757f4-374f-4d75-9834-577a264a0f47" */,
    status: number /* 2 */,
    status_object: [object],
    status_text: string /* "unfulfilled" */,
    status_new: string /* "unfulfilled" */,
    price: number /* 0 */,
    is_free: boolean,
    tracking_number: null,
    created_at: Date /* "2024-05-15 15:48" */,
    updated_at: Date /* "2024-05-15 15:48" */,
    delegated_to_canshipy: boolean,
    payload: [object],
    address: any
  },
  discount: {
    id: string /* "59b97352-0d59-48bd-9574-a061d47baf0e" */,
    value: number /* 0 */,
    type: number /* 2 */,
    reason: null,
    type_text: string /* "fixed" */
  },
  variants: [[object]],
  customer: {
    id: string /* "1ece4594-538c-425c-943b-b9a57318cf35" */,
    first_name: string /* "Abdallah" */,
    last_name: string /* "Zaghloul" */,
    full_name: string /* "Abdallah Zaghloul" */,
    email: string /* "3bdallahzaghloul@gmail.com" */,
    avatar: string /* "https://www.gravatar.com/avatar/7e7845c46efd6606dfd0d28afe236dbe?s=100&d=http://seller-area.youcanshop.dev/store-admin/images/generic_avatar.png" */,
    phone: string | null,
    country: string /* "Egypt" */,
    region: null,
    city: string /* "matrouh" */,
    notes: string | null,
    location: string /* ", Egypt" */,
    created_at: Date /* "2024-04-14T21:20:03+00:00" */,
    updated_at: Date /* "2024-04-14T21:20:03+00:00" */,
    deleted_at: Date | null,
    links: [object],
    address: any
  },
}

