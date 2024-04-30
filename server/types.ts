import { Auth } from "googleapis"
import { Session } from "@prisma/client"

export type Setting = {
    storeId: string
    clientId: string,
    clientSecret: string
    isConnected: boolean
    credentials?: Auth.Credentials,
    createdAt: Date,
    updatedAt: Date,
}

export type { Session }