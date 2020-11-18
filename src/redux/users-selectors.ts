import { createSelector } from "reselect"
import { UserType } from "../types/types"
import { RootStateType } from "./redux-store"

const getUsers = (state: RootStateType): Array<UserType> => state.usersReducer.users
export const getUsersSelector = createSelector(
    getUsers,
    users => users.filter((user: UserType): boolean => true)
)
export const getPageSize = (state: RootStateType): number => state.usersReducer.pageSize
export const getTotalUsersCount = (state: RootStateType): number => state.usersReducer.totalUsersCount
export const getCurrentPage = (state: RootStateType): number => state.usersReducer.currentPage
export const getIsFetching = (state: RootStateType): boolean => state.usersReducer.isFetching
export const getFilters = (state: RootStateType) => state.usersReducer.filter
