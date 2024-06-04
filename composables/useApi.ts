//@ts-nocheck
import type { UseFetchOptions } from "nuxt/app";
import type { Setting, ResBody } from "../utils/types";
import { toast } from "@youcan/ui-vue3/helpers";
import { ResBody } from "../server/utils/types";

const fetcher = <T>(url: string, options?: UseFetchOptions<unknown>): Promise<Ref<T | null>> => useFetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  onRequestError({ error }) {
    toast.show({
      title: "Error",
      description: error.message
    })
  },
  onResponseError({ error }) {
    toast.show({
      title: "Error",
      description: error?.message
    })
  },
  ...options,

}).then(
  ({ data: resBody }: { data: Ref<ResBody<T>> }) => ref(resBody.value.data)
)

export default {

  getSetting: () => fetcher<Setting>("/setting"),

  setSetting: (setting: Partial<Setting>) => fetcher<Setting>("/setting", {
    method: "POST",
    body: setting
  }),

}