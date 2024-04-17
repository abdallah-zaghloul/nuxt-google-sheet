import prisma from '~/prisma/singleton'
import useVuelidate from "@vuelidate/core";
import {required} from "@vuelidate/validators";

export default defineEventHandler(async (event) => {
    const session = event.context.session;
    return await prisma.setting.create({
        data: {

        }
    })
});