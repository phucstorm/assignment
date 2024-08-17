import type { User } from "@acme/shared-models"

export type UserState = Partial<UserListState>

type UserListState = {
    list: User[]
}