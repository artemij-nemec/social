import { ResponseCodes } from "../api/api"
import { UserAPI } from "../api/users-api"
import { UserType } from "../types/types"
import { ActionTypes, ThunkType } from "./redux-store"

let initialState = {
    users:              [] as Array<UserType>,
    pageSize:           10,
    totalUsersCount:    0,
    currentPage:        1,
    isFetching:         false,
    filter: {
        term:       '',
        friends:    undefined as boolean | undefined
    }
}
export type UsersStateType = typeof initialState
export type UsersFilterType = typeof initialState.filter
type ActionsType = ActionTypes<typeof actions>

const usersReducer = (
    state = initialState,
    action: ActionsType
): UsersStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (action.userId === user.id) {
                        return {
                            ...user,
                            followed: true
                        }
                    }
                    return user
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(user => {
                    if (action.userId === user.id) {
                        return {
                            ...user,
                            followed: false
                        }
                    }
                    return user
                })
            }
        case 'SET_USERS':
            return {
                ...state,
                users: [...action.users]
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.page
            }
        case 'SET_PAGE_SIZE':
            return {
                ...state,
                pageSize: action.pageSize
            }
        case 'SET_USERS_TOTAL_COUNT':
            return {
                ...state,
                totalUsersCount: action.count
            }
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: !state.isFetching
            }
        case 'TOGGLE_FOLLOWING_PROGRESS':
            return {
                ...state,
                users: state.users.map(user => {
                    if (action.userId === user.id) {
                        return {
                            ...user,
                            followingInProgress: action.state
                        }
                    }
                    return user
                })
            }
        case 'SET_USERS_FILTER':
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state
    }
}

const actions = {
    follow: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollow: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    toggleFollowingProgress: (userId: number, state: boolean) => ({ type: 'TOGGLE_FOLLOWING_PROGRESS', userId, state } as const),
    setCurrentPage: (page: number) => ({ type: 'SET_CURRENT_PAGE', page } as const),
    setPageSize: (pageSize: number) => ({ type: 'SET_PAGE_SIZE', pageSize } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    setUsersTotalCount: (count: number) => ({ type: 'SET_USERS_TOTAL_COUNT', count } as const),
    toggleIsFetching: () => ({ type: 'TOGGLE_IS_FETCHING' } as const),
    setUsersFilter: (filter: UsersFilterType) => ({ type: 'SET_USERS_FILTER', payload: filter } as const)
}
export { actions as usersActions }
export const getUsersList = (
    currentPage:    number,
    pageSize:       number,
    filter:         UsersFilterType
): ThunkType<ActionsType> => {
    return async (dispatch) => {
        try {
            dispatch(actions.toggleIsFetching())
            dispatch(actions.setCurrentPage(currentPage))
            dispatch(actions.setUsersFilter(filter))
            const data = await UserAPI.getUsers(currentPage, pageSize, filter.term, filter.friends)
            dispatch(actions.toggleIsFetching())
            dispatch(actions.setUsers(data.items))
            dispatch(actions.setUsersTotalCount(data.totalCount))
        } catch (error) {
            console.log(error)
        }
    }
}
export const followUser = (userId: number): ThunkType<ActionsType> => {
    return async (dispatch) => {
        try {
            dispatch(actions.toggleFollowingProgress(userId, true))
            const data = await UserAPI.follow(userId)
            if (data.resultCode === ResponseCodes.Success) {
                dispatch(actions.follow(userId))
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(actions.toggleFollowingProgress(userId, false))
        }
    }
}
export const unfollowUser = (userId: number): ThunkType<ActionsType> => {
    return async (dispatch) => {
        try {
            dispatch(actions.toggleFollowingProgress(userId, true))
            const data = await UserAPI.unfollow(userId)
            if (data.resultCode === ResponseCodes.Success) {
                dispatch(actions.unfollow(userId))
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(actions.toggleFollowingProgress(userId, false))
        }
    }
}

export default usersReducer
