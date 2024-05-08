import { H3Event } from "h3"

export default function (event: H3Event) {
  return event.context.session?.storeId ?? process.env.STORE_ID
}