import type { Setting } from "@prisma/client"

export const useStoreId = () => useState(
  'storeId', () => useRequestEvent()?.context.session.storeId
)

export const useSetting = (setting?: Setting|null) => useState(
  'setting', () => setting
)