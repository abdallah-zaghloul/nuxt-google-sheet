import type { Setting } from "../utils/types"

export const useYoucanSession = () => useState(
  'youcanSession', () => useRequestEvent()?.context.session
)

export const useSetting = (setting?: Setting | null) => useState(
  'setting', () => setting
)