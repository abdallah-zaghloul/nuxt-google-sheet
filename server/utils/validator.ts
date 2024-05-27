import { ZodTypeAny } from "zod"
import { H3Event } from "h3"
import handler from "./handler"

const parse = (schema: ZodTypeAny, data: any) => {
  const res = schema.safeParse(data)
  return res.success ? res.data : handler.validationError(res.error.flatten().fieldErrors)
}

export default {
  reqBody: async (schema: ZodTypeAny, event: H3Event) => parse(schema, await readBody(event)),
  reqQuery: (schema: ZodTypeAny, event: H3Event) => parse(schema, getQuery(event)),
  routeParam: (schema: ZodTypeAny, event: H3Event, name: string) => parse(schema, getRouterParam(event, name)),
  parse: parse
}
