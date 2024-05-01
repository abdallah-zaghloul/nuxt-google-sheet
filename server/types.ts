import { Auth } from "googleapis"
import { Session } from "@prisma/client"

export type Credentials = Auth.Credentials;

export type Client = Auth.OAuth2Client

export type Setting = {
    storeId: string
    clientId: string,
    clientSecret: string
    isConnected: boolean
    credentials?: Credentials,
    createdAt: Date,
    updatedAt: Date,
}

export type { Session }