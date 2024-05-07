import { H3Event } from "h3"

const sendAnError = ({
  event,
  statusCode,
  statusMessage,
  data
}: {
  event: H3Event,
  statusCode: number
  statusMessage: string,
  data?: any
}) => {

  const error = createError({
    statusCode,
    statusMessage,
    data
  })
  sendError(event, error)
  return error
}

const sendResponse = (data?: any) => ({
  statusCode: 200,
  statusMessage: "Success",
  stack: [],
  data: data
})

const globalError = (event: H3Event) => sendAnError({
  event: event,
  statusCode: 500,
  statusMessage: "Sorry something went wrong please try again later"
})

export default {
  validationError: (event: H3Event, data: any) => sendAnError({
    event: event,
    statusCode: 422,
    statusMessage: "Please insert a valid data",
    data: data
  }),

  notFoundError:(event: H3Event) => sendAnError({
    event: event,
    statusCode: 404,
    statusMessage: 'Not found'
  }),

  sync: (event: H3Event, fn: Function, catcher?: Function) => {
    try {
      return sendResponse(fn())
    } catch (error: any) {
      return catcher ? catcher() : globalError(event)
    }
  },

  async: (event: H3Event, fn: () => Promise<any>, catcher?: Function) => fn()
    .then(data => sendResponse(data))
    .catch((error: any) => catcher ? catcher() : globalError(event)),

  sendError: sendAnError,

  sendResponse: sendResponse,
  
  globalError: globalError,

}