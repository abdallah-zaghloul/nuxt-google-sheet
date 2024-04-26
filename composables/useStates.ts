import type { Setting } from "@prisma/client"

export const useYoucanSession = () => useState(
  'youcanSession', () => useRequestEvent()?.context.session
)

export const useSetting = (setting?: Setting | null) => useState(
  'setting', () => setting
)