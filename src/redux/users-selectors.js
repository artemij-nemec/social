import { createSelector } from "reselect"

const getUsers = state => state.usersReducer.users
export const getUsersSelector = createSelector(
    getUsers,
    users => users.filter(user => true)
)
export const getPageSize = state => state.usersReducer.pageSize
export const getTotalUsersCount = state => state.usersReducer.totalUsersCount
export const getCurrentPage = state => state.usersReducer.currentPage
export const getIsFetching = state => state.usersReducer.isFetching
