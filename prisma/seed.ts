import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const generateRandomName = () => `Sheet No:${Math.floor(Math.random() * 1000000)}`

const setting = {
    storeId: 'e8db3f50-6531-4607-b1f7-ae53c739840c',
    clientId: '886928372155-o6v47q96b8n45bhegntj0p5rptgvl5u8.apps.googleusercontent.com',
    clientSecret: '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',
    credentials: {
        "access_token": "ya29.a0Ad52N3_PV2WWOAnaXthg_JNKT8ku0sLhRmxqZ3rAVxFiTzr0uXS4uG9sW_YVA8Z2t9XPQ3Yqs-5x3vXV7XEfDNFFQWjFSNllqSK7iI-8RPfOJJI8ViI8Maa-JpCjlm8I4DJS5tVEaPdxzb93J_KQSdU3WvqDBnFaUnXHaCgYKAcYSARESFQHGX2MiLGma6iBws9vcJfJPRSySCw0171",
        "refresh_token": "1//03gU2Q_K9VVz1CgYIARAAGAMSNwF-L9IrVkaUSgi1CODDETtdllPdbhNR8Au7Yg8be4KJX6dJwGLlg2uhBYFJeGGdVvVXgi07E9M",
        "scope": "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.email openid",
        "token_type": "Bearer",
        "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUxYjkzYzY0MDE0NGI4NGJkMDViZjI5NmQ2NzI2MmI2YmM2MWE0ODciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4ODY5MjgzNzIxNTUtbzZ2NDdxOTZiOG40NWJoZWdudGowcDVycHRndmw1dTguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4ODY5MjgzNzIxNTUtbzZ2NDdxOTZiOG40NWJoZWdudGowcDVycHRndmw1dTguYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTcyNDQ4NzQ0MTI4NjM5NjgxOTUiLCJlbWFpbCI6IjNiZGFsbGFoemFnaGxvdWxAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiIzanBWdm5FTUEyREltRWRJU2R4ejJBIiwiaWF0IjoxNzE0NDYzOTA2LCJleHAiOjE3MTQ0Njc1MDZ9.LyrSMk9zGZvg9o3kNwX3Jasiq-F81H6AZIEVH2_IId-sgsRiJOqipPgbUm_aaldBFjfCBerFkg-ikwTIKC5IagrE3pLNOJ0TWSXDI7Abax4WsrXv3CJ1l3CnlxYnia9kdoO831nUcMHC2FZ0YD5yV0ZRwrPCCuOvh1c13YD9yqE-8P7m2fHlEvxZyjjdckf7eNb5NToi7gr9gvI4mr09KoTEU0mgWePd4Xog38OiI8-gE2jZOqhECuHsclHiCGBSRtu6KiIGCY7kLD7oom1iHZp7gxsJHa3Yz-YnOD6wT-LtDiLnoJNeJusfEep5JubqPzisbZUYYED8oUX-fMPCcA",
        "expiry_date": 1714467505674
    },
    sheets: [
        {
            name: generateRandomName(),
            fields: ['order_id'],
        },
        {
            name: generateRandomName(),
            fields: ['order_id', 'first name'],
        }
    ]
}

async function main() {
    await prisma.setting.upsert({
        where: { storeId: setting.storeId },
        create: {
            storeId: setting.storeId,
            clientId: setting.clientId,
            clientSecret: setting.clientSecret,
            credentials: setting.credentials,
            sheets: {
                createMany: {
                    data: setting.sheets,
                    skipDuplicates: true
                }
            }
        },
        update: {
            storeId: setting.storeId,
            clientId: setting.clientId,
            clientSecret: setting.clientSecret,
            credentials: setting.credentials,
            sheets: {
                createMany: {
                    data: setting.sheets,
                    skipDuplicates: true
                }
            }
        }
    }).catch((error: any) => {
        console.log(error)
        process.exit(1)
    }).finally(() => prisma.$disconnect())
}

main()