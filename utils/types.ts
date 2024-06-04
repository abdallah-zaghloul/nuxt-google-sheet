import type {
    Setting,
    Session,
    ResBody as ServerResBody
} from "../server/utils/types"

type ResBody<T> = Pick<ServerResBody<T>, "statusCode" | "statusMessage"> & { data: Ref<T> | null }

export type {
    Setting,
    Session,
    ResBody
}
