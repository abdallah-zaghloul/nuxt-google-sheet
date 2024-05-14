import { useFetch, type UseFetchOptions } from "nuxt/app";
import type { Setting } from "../types";

const fetcher = <T>(url: string, options?: UseFetchOptions<unknown, unknown>) => useFetch<T>(url, {
  //@ts-ignore
  method: "GET",
  ...options
}).then(
  //@ts-ignore
  res => ref<T>(res.data?.value?.data!),
)

export default {

  getSetting: () => fetcher<Setting | null>('/setting'),

  setSetting: (setting: Setting) => fetcher<Setting>('/setting', {
    method: 'POST',
    body: setting
  }),

}