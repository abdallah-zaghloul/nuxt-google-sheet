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
  throw error
}

const sendResponse = (data?: any) => ({
  statusCode: 200,
  statusMessage: "Success",
  data: data
})

const globalError = () => sendAnError({
  event: useEvent(),
  statusCode: 500,
  statusMessage: "Sorry something went wrong please try again later"
})

export default {
  validationError: (data: any) => sendAnError({
    event: useEvent(),
    statusCode: 422,
    statusMessage: "Please insert a valid data",
    data: data
  }),

  notFoundError: () => sendAnError({
    event: useEvent(),
    statusCode: 404,
    statusMessage: 'Not found'
  }),

  unAuthorizedError: (message = "unAuthorized") => sendAnError({
    event: useEvent(),
    statusCode: 401,
    statusMessage: message
  }),

  sync: (fn: Function, catcher?: Function) => {
    try {
      return sendResponse(fn())
    } catch (error: any) {
      return catcher ? catcher() : globalError()
    }
  },

  async: (fn: () => Promise<any>, catcher?: Function) => fn()
    .then(data => sendResponse(data))
    .catch((error: any) => catcher ? catcher() : globalError()),

  sendError: sendAnError,

  sendResponse: sendResponse,

  globalError: globalError,

}