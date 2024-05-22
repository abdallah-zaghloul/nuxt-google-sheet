import { H3Event } from "h3"

export default async function (event: H3Event) {
  return event.context.session ?? prisma.session.findFirst({
    where: {
      storeId: process.env.STORE_ID
    },
  })
}