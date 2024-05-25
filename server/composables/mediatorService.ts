import settingService from "./settingService";

const dispatcher = {
  disconnectSetting: async (storeId: string) => await settingService.disconnect(storeId),
}

export default function <Event extends (keyof typeof dispatcher)>(
  event: Event,
  ...params: Parameters<typeof dispatcher[Event]>
): ReturnType<typeof dispatcher[Event]> {
  // @ts-ignore
  return dispatcher[event](...params)
}