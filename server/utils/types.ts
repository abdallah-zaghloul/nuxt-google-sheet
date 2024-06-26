import { Auth } from "googleapis"
import { Session } from "@prisma/client"

export type ResBody<T> = {
  statusCode: number,
  statusMessage: string,
  data: T
}

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
  | "Total tax"
  | "Order date"
  | "Total charge"
  | "Total shipping fees"
  | "Payment status"
  | "Total discount"
  | "Total quantity"
  | "Shipping status"
  | "Tracking number"
  | "Variant price"
  | "Order customer currency"
  | "Total with customer currency"
  //missing
  | "SKU" /* Stock Keeping Unit */
  | "Vendor"
  | "Total coupon"
  | "Payment gateway"
  | "Product name"
  | "Product URL"
  | "Product variant"
)

export type Headers = [OrderId, ...Header[]]

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

export type SyncableSheet = Pick<Sheet, "id" | "googleId" | "headers">

export type GoogleSpreadSheet = Pick<Sheet, "title" | "headers" | "googleId" | "googleUrl">

export type SheetUpdate = Pick<Sheet, "title" | "headers" | "status">

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

export type OrderEvent = {
  id: string, /* "a2838db5-5b28-44a1-93f2-49d9aceee367" */
  ref: `${number}`, /* "002" */
  vat: number, /* 0 */
  total: number, /* 200 */
  currency: string, /* "USD" */
  store_id: string, /* "e8db3f50-6531-4607-b1f7-ae53c739840c" */
  customer_currency_rate?: number | null /* null */,
  notes?: string | null,
  status: number, /* 1 */
  status_new: string, /* "open" */
  is_refunded_by_platform: boolean, /* false */
  platform_fee: number, /* 0 */
  payment_status: number, /* 2 */
  payment_status_new: string, /* "unpaid" */
  created_at: Date, /* "2024-05-15T15:48:49+00:00" */
  updated_at: Date, /* "2024-05-15T15:48:49+00:00" */
  tags: [], /* ? */
  extra_fields: any, /* ? */
  custom_fields: any, /* ? */
  status_object: {
    slug: string, /* "open" */
    name: string, /* "open" */
    color: string, /* "#AC4765FF" */
  },
  customer_currency: {
    name: string, /* "US Dollar" */
    code: string, /* "USD" */
    symbol: string, /* "$" */
    major_value: `${number}`, /* "0.01" */
    conversion_rate_base_usd: number, /* 1 */
    created_at: Date, /* "2019-11-27 13:05:44" */
    updated_at: Date, /* "2023-02-01 00:00:08" */
    deleted_at: Date | null,
    conversion_rate_last_updated_at: Date, /* "2023-02-01 00:00:08" */
  },
  links: {
    self: string, /* "http://seller-area.youcanshop.dev/admin/orders/a2838db5-5b28-44a1-93f2-49d9aceee367" */
    edit: string, /* "http://seller-area.youcanshop.dev/admin/orders/a2838db5-5b28-44a1-93f2-49d9aceee367/edit" */
  },
  payment: {
    status_text: string, /* "unpaid" */
    status_object: {
      slug: string, /* "unfulfilled" */
      name: string, /* "unfulfilled" */
      color: string, /*  "#AC4765FF" */
    },
    status: number, /* 2 */
    created_at: Date, /* "2024-05-15 15:48" */
    updated_at: Date, /* "2024-05-15 15:48" */
  },
  shipping: {
    shipping_zone_id: string, /* "2a1757f4-374f-4d75-9834-577a264a0f47" */
    status: number, /* 2 */
    status_object: {
      slug: string, /* "unfulfilled" */
      name: string, /* "unfulfilled" */
      color: string, /*  "#AC4765FF" */
    },
    status_text: string, /* "unfulfilled" */
    status_new: string, /* "unfulfilled" */
    price: number, /* 0 */
    is_free: boolean, /* true */
    tracking_number: null,
    created_at: Date, /* "2024-05-15 15:48" */
    updated_at: Date, /* "2024-05-15 15:48" */
    delegated_to_canshipy: boolean /* false */,
    payload: {
      id: string, /* "a2838db5-5b28-44a1-93f2-49d9aceee367" */
      compound_id: string, /* "a2838db5-5b28-44a1-93f2-49d9aceee367" */
      name: string, /* "Free Shipping" */
      display_name: string, /* "Free Shipping" */
      price: number, /* 0 */
      is_free: boolean, /* true */
      is_active: boolean, /* true */
    },
    address?: {
      id: string, /* "58b17850-1ff4-4bdd-917b-1f9f4933d51d" */
      first_name: string, /* Abdallah" */
      last_name: string, /* "Zaghloul" */
      full_name: string, /* "Abdallah Zaghloul" */
      first_line: string, /* "Egypt" */
      second_line: string, /* "Talaat Mostafa Buildings" */
      company: string, /* "YouCan" */
      phone: string, /* "+201098526412" */
      country_code: string, /* "EG" */
      country_name: string, /* "Egypt" */
      state: null,
      region: string, /* "Mandarah Qebli" */
      city: string, /* "Alexandria" */
      zip_code: `${number}`, /* "51511" */
      default: boolean, /* true */
      created_at: Date, /* 1716372292 */
      updated_at: Date, /* 1716374592 */
    }
  },
  discount: {
    id: string, /* "59b97352-0d59-48bd-9574-a061d47baf0e" */
    value: number, /* 0 */
    type: number, /* 2 */
    reason: null,
    type_text: string, /* "fixed" */
  },
  variants: [], /* [{
    "id": "21df9d23-a1ad-4692-81b3-06d30947b0c4",
    "price": 300,
    "quantity": 1,
    "is_upsell": false,
    "created_at": 1716367356,
    "updated_at": 1716367356,
    "extra_fields": [],
    "variant": []
  }] */
  customer: {
    id: string, /* "1ece4594-538c-425c-943b-b9a57318cf35" */
    first_name: string, /* "Abdallah" */
    last_name: string, /* "Zaghloul" */
    full_name: string, /* "Abdallah Zaghloul" */
    email: string, /* "3bdallahzaghloul@gmail.com" */
    avatar: string, /* "https://www.gravatar.com/avatar/7e7845c46efd6606dfd0d28afe236dbe?s=100&d=http://seller-area.youcanshop.dev/store-admin/images/generic_avatar.png" */,
    phone: string | null,
    country: string, /* "Egypt" */
    region: string | null,
    city: string, /* "matrouh" */
    notes?: string, /* ? */
    location: string, /* ", Egypt" */
    created_at: Date, /* "2024-04-14T21:20:03+00:00" */
    updated_at: Date, /* "2024-04-14T21:20:03+00:00" */
    deleted_at: Date | null,
    links: {
      edit: string /* "http://seller-area.youcanshop.dev/admin/customers/1ece4594-538c-425c-943b-b9a57318cf35/edit" */
    },
    address?: []
  },
}


export type Order = {
  id: string, /* "a2838db5-5b28-44a1-93f2-49d9aceee367" */
  ref: `${number}`, /* "002" */
  vat: number, /* 0.01 */
  total: number, /* 200 */
  currency: string, /* "USD" */
  // "store_id" missing
  customer_currency_rate?: number | null, /* null */
  notes?: string | null, /* null */
  status: number, /* 1 */
  status_new: string, /* "open" */
  is_refunded_by_platform: boolean, /* false */
  platform_fee: number, /* 0 */
  payment_status: number, /* 2 */
  payment_status_new: string, /* "unpaid" */
  created_at: Date, /* "2024-05-15T15:48:49+00:00" */
  updated_at: Date, /* "2024-05-15T15:48:49+00:00" */
  tags: [], /* ? */
  extra_fields: any, /* ? */
  custom_fields: any, /* ? */
  status_object: {
    slug: string, /* "open" */
    name: string, /* "open" */
    color: string /* "#AC4765FF" */
  },
  customer_currency: {
    name: string, /* "US Dollar" */
    code: string, /* "USD" */
    symbol: string, /* "$" */
    major_value: `${number}`, /* "0.01" */
    conversion_rate_base_usd: number, /* 1 */
    created_at: Date, /* "2019-11-27 13:05:44" */
    updated_at: Date, /* "2023-02-01 00:00:08" */
    deleted_at: null, /* null */
    conversion_rate_last_updated_at: Date /* "2023-02-01 00:00:08" */
  },
  links: {
    // "self" missing
    // "edit" missing
    // "show" extra
    show: string /* "http://api.youcanshop.dev/orders/a2838db5-5b28-44a1-93f2-49d9aceee367" */
  },
  payment: {
    status_text: string, /* "unpaid" */
    status_object: {
      slug: string, /* "unpaid" */
      name: string, /* "unpaid" */
      color: string /* "#AC4765FF" */
    },
    status: number, /* 2 */

    //"gateway_type" extra
    gateway_type?: number, /* 0 */
    //"gateway_type_text" extra
    gateway_type_text?: string, /* "Unknown Gateway" */

    created_at: Date, /* "2024-05-15 15:48" */
    updated_at: Date /* "2024-05-15 15:48" */
  },
  shipping: {
    //shipping_zone_id missing
    status: number, /* 2 */
    status_object: {
      slug: string, /* "unfulfilled" */
      name: string, /* "unfulfilled" */
      color: string, /* "#AC4765FF" */
    },
    status_text: string, /* "unfulfilled" */
    // "status_new" missing
    price: number, /* 0 */
    is_free: boolean, /* true */
    tracking_number: number | null, /* null */
    created_at: Date, /* "2024-05-15 15:48" */
    updated_at: Date, /*  "2024-05-15 15:48" */
    // "delegated_to_canshipy" missing
    address: {
      id: string, /* "58b17850-1ff4-4bdd-917b-1f9f4933d51d" */
      first_name: string, /* Abdallah" */
      last_name: string, /* "Zaghloul" */
      full_name: string, /* "Abdallah Zaghloul" */
      first_line: string, /* "Egypt" */
      second_line: string, /* "Talaat Mostafa Buildings" */
      company: string, /* "YouCan" */
      phone: string, /* "+201098526412" */
      country_code: string, /* "EG" */
      country_name: string, /* "Egypt" */
      state: null,
      region: string, /* "Mandarah Qebli" */
      city: string, /* "Alexandria" */
      zip_code: `${number}`, /* "51511" */
      default: boolean, /* true */
      created_at: Date, /* 1716372292 */
      updated_at: Date, /* 1716374592 */
    }
  },
  // "payload" missing
  // "address" missing
  discount: {
    id: string, /* "59b97352-0d59-48bd-9574-a061d47baf0e" */
    value: number, /* 0 */
    type: number, /* 2 */
    reason: null,
    type_text: string /* "fixed" */
  },
  // "variants" extra
  variants: [
    {
      id: string, /* "7a61baa7-2244-4138-a2fc-4ada9e451313" */
      price: number, /* 200 */
      is_upsell: boolean, /* false */
      quantity: number, /* 1 */
      created_at: Date | number, /* 1715788129 */
      updated_at: Date | number, /* 1715788129 */
      extra_fields: null,
      variant: {
        id: string, /* "e4cc6d2c-4c8b-450d-94f8-5a1ef46afaa2" */
        variations: {
          default: string /* "default" */
        },
        options: [
          string /* "default" */
        ],
        values: [
          string /* "default" */
        ],
        price: number, /* 200 */
        compare_at_price: number, /* 250 */
        weight: number, /* 0 */
        sku: string, /* "" */
        barcode: string, /* "" */
        inventory: number, /* 5 */
        is_selected: boolean, /* false */
        is_default: boolean, /* false */
        image: {
          name: null | string, /* null */
          url: null | string /* null */
        },
        created_at: Date, /* "2024-03-12T14:38:41+00:00" */
        updated_at: Date, /* "2024-03-12T14:38:41+00:00" */
        product: {
          id: string, /* "af3230d7-fc49-44a7-955b-52f0c4b900b3" */
          name: string, /* "Second product" */
          slug: string, /* "product-2" */
          public_url: null | string, /* null */
          thumbnail: string, /* "https://cdn.youcanshop.dev/stores/c21f969b5f03d33d43e04f8f136e7682/products/QEnB4R9jIbsLEBrTd83nHIxLhnzsqCtmPEtLt5zl_md.png"*/
          description: string, /* "<p>The second product</p>" */
          price: number, /* 200 */
          compare_at_price: number,/* 250 */
          cost_price: null | number, /* null */
          currency: {
            code: string, /* "USD" */
            symbol: string /* "$" */
          },
          visibility: boolean, /* true */
          has_variants: boolean, /* true */
          variants_count: number, /* 1*/
          variant_options: [],
          inventory: number, /* 5 */
          track_inventory: boolean, /* false */
          you_save_amount: number, /* 50 */
          orders_count: number, /* 12 */
          meta: {
            title: string, /* "Second product" */
            description: string, /* "The second product" */
            images: [
              {
                path: string, /* "stores/c21f969b5f03d33d43e04f8f136e7682/products/QEnB4R9jIbsLEBrTd83nHIxLhnzsqCtmPEtLt5zl.png" */
                link: string, /* "https://cdn.youcanshop.dev/stores/c21f969b5f03d33d43e04f8f136e7682/products/QEnB4R9jIbsLEBrTd83nHIxLhnzsqCtmPEtLt5zl.png" */
              }
            ]
          },
          advanced_options: {
            enabled: boolean /* false */
          },
          created_at: Date, /* "2024-03-12T14:38:41+00:00" */
          updated_at: Date, /* "2024-05-22T08:40:40+00:00" */
          deleted_at: boolean, /* false */
          has_related_products: boolean, /* false */
          related_products: [],
          images: [
            {
              id: string, /* "1f059172-a756-4757-9eb3-69c6296e5d48" */
              name: string, /* "stores/c21f969b5f03d33d43e04f8f136e7682/products/QEnB4R9jIbsLEBrTd83nHIxLhnzsqCtmPEtLt5zl.png" */
              type: number, /* 1 */
              url: string, /* "https://cdn.youcanshop.dev/stores/c21f969b5f03d33d43e04f8f136e7682/products/QEnB4R9jIbsLEBrTd83nHIxLhnzsqCtmPEtLt5zl.png" */
              order: number, /* 0 */
              variations: {
                original: string, /* "https://cdn.youcanshop.dev/stores/c21f969b5f03d33d43e04f8f136e7682/products/QEnB4R9jIbsLEBrTd83nHIxLhnzsqCtmPEtLt5zl.png" */
                sm: string, /* "https://cdn.youcanshop.dev/stores/c21f969b5f03d33d43e04f8f136e7682/products/QEnB4R9jIbsLEBrTd83nHIxLhnzsqCtmPEtLt5zl_sm.png" */
                md: string, /* "https://cdn.youcanshop.dev/stores/c21f969b5f03d33d43e04f8f136e7682/products/QEnB4R9jIbsLEBrTd83nHIxLhnzsqCtmPEtLt5zl_md.png" */
                lg: string, /* "https://cdn.youcanshop.dev/stores/c21f969b5f03d33d43e04f8f136e7682/products/QEnB4R9jIbsLEBrTd83nHIxLhnzsqCtmPEtLt5zl_lg.png" */
              }
            }
          ]
        }
      }
    }
  ],
  customer: {
    id: string, /* "1ece4594-538c-425c-943b-b9a57318cf35" */
    first_name: string, /* "Abdallah" */
    last_name: string, /* "Zaghloul" */
    full_name: string, /* "Abdallah Zaghloul" */
    email: string, /* "3bdallahzaghloul@gmail.com" */
    avatar: string, /* "https://www.gravatar.com/avatar/7e7845c46efd6606dfd0d28afe236dbe?s=100&d=http://seller-area.youcanshop.dev/store-admin/images/generic_avatar.png" */,
    phone: string | null,
    country: string, /* "Egypt" */
    region: string | null,
    city: string, /* "matrouh" */
    notes?: string, /* ? */
    location: string, /* ", Egypt" */
    created_at: Date, /* "2024-04-14T21:20:03+00:00" */
    updated_at: Date, /* "2024-04-14T21:20:03+00:00" */
    deleted_at: Date | null,
    links: {
      show: string, /* "http://api.youcanshop.dev/customers/1ece4594-538c-425c-943b-b9a57318cf35" */
      edit: string /* "http://api.youcanshop.dev/customers/1ece4594-538c-425c-943b-b9a57318cf35" */
    },
    address?: [
      {
        id: string, /* "58b17850-1ff4-4bdd-917b-1f9f4933d51d" */
        first_name: string, /* Abdallah" */
        last_name: string, /* "Zaghloul" */
        full_name: string, /* "Abdallah Zaghloul" */
        first_line: string, /* "Egypt" */
        second_line: string, /* "Talaat Mostafa Buildings" */
        company: string, /* "YouCan" */
        phone: string, /* "+201098526412" */
        country_code: string, /* "EG" */
        country_name: string, /* "Egypt" */
        state: null,
        region: string, /* "Mandarah Qebli" */
        city: string, /* "Alexandria" */
        zip_code: `${number}`, /* "51511" */
        default: boolean, /* true */
        created_at: Date, /* 1716372292 */
        updated_at: Date, /* 1716374592 */
      }
    ]
  },
}

