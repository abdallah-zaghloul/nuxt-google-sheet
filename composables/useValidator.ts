import useVuelidate, { type Validation, type ValidationRuleWithParams, type ValidationRuleWithoutParams } from "@vuelidate/core"

export default function ({
    rules, data, onPass, onFail, onError
}: {
    rules: { [key: string]: ValidationRuleWithParams<any> | ValidationRuleWithoutParams | any }
    data: Ref<any>
    onPass: Function
    onFail?: Function
    onError?: Function
}) {
    const setRules = computed(() => rules)
    const v$ = useVuelidate(setRules, data)
    const hasError = (v$: Validation<{ [key: string]: any }>, input: string) => v$?.[input]?.$error
    const errorMessage = (v$: Validation<{ [key: string]: any }>, input: string) => v$?.[input]?.$errors[0].$message
    const onSubmit = async () => await v$.value.$validate().then(
        onfulfilled => !v$.value.$error ? onPass() : (onFail && onFail()),
        onrejected => onError && onError()
    )

    return {
        rules: setRules,
        data,
        v$,
        onPass,
        onFail,
        onError,
        onSubmit,
        hasError,
        errorMessage
    }
}