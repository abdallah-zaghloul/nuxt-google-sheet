import settingService from "./settingService";

const dispatcher = {
  disconnectSetting: async (storeId: string) => await settingService.disconnect(storeId),
  connectSetting: async (storeId: string, credentials: Credentials, email?: string) => await settingService.connect(storeId, credentials, email),
}

export default function <Event extends (keyof typeof dispatcher)>(
  event: Event,
  ...params: Parameters<typeof dispatcher[Event]>
): ReturnType<typeof dispatcher[Event]> {
  // @ts-ignore
  return dispatcher[event](...params)
}