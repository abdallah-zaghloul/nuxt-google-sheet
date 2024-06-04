import type {
    Setting,
    Session,
    ResBody as ServerResBody,
    Headers,
    Sheet,
} from "../server/utils/types"

type ResBody<T> = Pick<ServerResBody<T>, "statusCode" | "statusMessage"> & { data: Ref<T> | null }
type SheetUpdate = Pick<Sheet, "title" | "headers">

export type {
    Setting,
    Session,
    ResBody,
    Headers,
    Sheet,
    SheetUpdate
}
