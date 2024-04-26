import type { Setting } from "@prisma/client";

export default {

  getSetting: () => useFetch<Setting | null>('/setting', { method: 'GET' }).then(
    onfulfilled => onfulfilled.data,
  ),

  setSetting: (setting: Setting) => useFetch<Setting>('/setting', {
    method: 'POST',
    body: setting
  }).then(
    onfulfilled => onfulfilled.data,
  ),

}