import type { Setting } from "../types"

export const useYoucanSession = () => useState(
  'youcanSession', () => useRequestEvent()?.context.session
)

export const useSetting = (setting?: Setting | null) => useState(
  'setting', () => setting
)