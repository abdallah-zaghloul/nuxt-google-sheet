import type {
    Setting,
    Session,
    ResBody as ServerResBody,
    OrderId,
    Header,
    Headers,
    Sheet,
} from "../server/utils/types"

type ResBody<T> = Pick<ServerResBody<T>, "statusCode" | "statusMessage"> & { data: Ref<T> | null }
type SheetUpdate = Pick<Sheet, "title" | "headers" | "status">
type SheetCreate = Pick<Sheet, "title" | "headers">

export type {
    Setting,
    Session,
    ResBody,
    OrderId,
    Header,
    Headers,
    Sheet,
    SheetUpdate,
    SheetCreate
}
