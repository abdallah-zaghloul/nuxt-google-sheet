import { toast } from "@youcan/ui-vue3/helpers";
import type { UseFetchOptions } from "nuxt/app";
import type {
  ResBody,
  Headers,
  Sheet,
  SheetUpdate
} from "../utils/types";

// default pagination Count
const paginationCount = Number(process.env.PAGINATION_COUNT ?? 1000)

// global fetcher
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
  //@ts-ignore retrive data key
  ({ data: resBody }: { data: Ref<ResBody<T>> }) => ref(resBody.value.data)
)




export default {

  getSetting: () => fetcher<Setting>("/setting"),



  setSetting: (setting: Partial<Setting>) => fetcher<Setting>("/setting", {
    method: "POST",
    body: setting
  }),



  getSheetHeaders: () => fetcher<Headers>("/sheet/headers"),



  getSheet: (id: string) => fetcher<Sheet>(`/sheet/${id}`),



  getSheets: (id: string, take?: number, skip?: number) => fetcher<Sheet[]>("/sheet", {
    query: {
      take: take ?? paginationCount
    },
  }),



  deleteSheet: (id: string) => fetcher<boolean>(`/sheet/${id}`, {
    method: "DELETE"
  }),



  updateSheet: (id: string, sheetUpdate: SheetUpdate) => fetcher<Sheet>(`/sheet/${id}`, {
    method: "PATCH",
    body: sheetUpdate
  }),



  manualSyncSheet: (sheetId: string, orderRefs: `${number}`[]) => fetcher<Sheet>(`/sheet/manual-sync`, {
    method: "POST",
    body: {
      sheetId,
      orderRefs
    }
  }),

}