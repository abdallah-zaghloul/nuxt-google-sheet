import { H3Event } from "h3"

const globalError = (event: H3Event) => sendError(event, createError({
  statusCode: 500,
  data: {
    message: "Sorry something went wrong please try again later"
  }
}))

export default {
  validationError: (event: H3Event, data: any) => sendError(event, createError({
    statusCode: 422,
    data: data
  })),

  globalError: globalError,

  sync: (event: H3Event, fn: Function, catcher?: Function) => {
    try {
      return fn()
    } catch (error: any) {
      return catcher ? catcher() : globalError(event)
    }
  },

  async: (event: H3Event, fn: () => Promise<any>, catcher?: Function) => fn().catch(
    (error: any) => catcher ? catcher() : globalError(event)
  ),
}