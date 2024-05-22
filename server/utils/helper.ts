import { H3Event } from "h3"

export default {
    check: (valid: boolean, ...args: any) => {
        !valid && console.log(...args)
        return valid
    },

    dd: (...args: any) => {
        console.log(...args)
        process.exit()
    },

    getNestedProp: (array: [] | null, prop: string): any => array?.find(obj => obj?.[prop] !== undefined)?.[prop],

    getStoreId: (event: H3Event): string => event.context.session?.storeId ?? process.env.STORE_ID,

    getSession: async (event: H3Event) => event.context.session ?? prisma.session.findFirst({
        where: {
            storeId: process.env.STORE_ID
        },
    }),

}