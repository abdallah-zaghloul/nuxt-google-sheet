import { Setting } from "@prisma/client";
import settingService from "../composables/settingService";
import googleService from "../composables/googleService";
import { ServerResponse, IncomingMessage } from "http";
import { H3Event } from "h3"

/*
const removeCORSAtRedirect = (event: H3Event) => {
    event.node.res.setHeader('Access-Control-Allow-Origin', '*')
    event.node.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    event.node.res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
}
*/

export default defineEventHandler(async (event) => {
    const reqBody: Setting = await readBody(event)
    const setting = await settingService.set(reqBody.storeId, reqBody)

    if (!setting.isConnected) 
        await sendRedirect(event, googleService.getAuthUrl(setting))
    
    return setting
});