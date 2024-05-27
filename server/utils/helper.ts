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

    getStoreId: (): string => useEvent().context.session?.storeId ?? process.env.STORE_ID,

    getSession: async () => useEvent().context.session ?? prisma.session.findFirst({
        where: {
            storeId: process.env.STORE_ID
        },
    }),

}