import { ZodTypeAny } from "zod"
import { H3Event } from "h3"
import handler from "./handler"

export default {
  reqBody: async (schema: ZodTypeAny, event: H3Event) => {
    const reqBody = await readBody(event)
    const res = schema.safeParse(reqBody)

    //return only required schema data and strip extra keys without errors
    if (res.success)
      return res.data

    return handler.validationError(event, res.error.flatten().fieldErrors)
  },

  reqQuery: (schema: ZodTypeAny, event: H3Event) => {
    const reqQuery = getQuery(event);
    const res = schema.safeParse(reqQuery)

    //return only required schema data and strip extra keys without errors
    if (res.success)
      return res.data

    return handler.validationError(event, res.error.flatten().fieldErrors)
  }
}
