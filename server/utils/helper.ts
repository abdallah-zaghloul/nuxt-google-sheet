import { GaxiosResponse } from "gaxios"

function check(valid: boolean, ...args: any) {
    !valid && console.log(...args)
    return valid
}

export default {
    check: check,

    dd: (...args: any) => {
        console.log(...args)
        process.exit()
    },

    checkRes: (res: GaxiosResponse) => check((res.status >= 200 && res.status < 300), res),

    isSet: (value: any) => value !== undefined && value !== null,

    getNestedProp: (array: any[] | null, prop: string): any => array?.find(obj => obj?.[prop] !== undefined)?.[prop],

    getStoreId: (): string => useEvent().context.session?.storeId ?? process.env.STORE_ID,

    getSession: async () => useEvent().context.session ?? prisma.session.findFirst({
        where: {
            storeId: process.env.STORE_ID
        },
    }),

}