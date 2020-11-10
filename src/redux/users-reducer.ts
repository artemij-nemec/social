import { ThunkAction } from "redux-thunk"
import { ResponseCodes, UserAPI } from "../api/api"
import { UserType } from "../types/types"
import { ActionTypes, RootStateType } from "./redux-store"

let initialState = {
    users:              [] as Array<UserType>,
    pageSize:           10,
    totalUsersCount:    0,
    currentPage:        1,
    isFetching:         false
}
export type UsersStateType = typeof initialState
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
        default:
            return state
    }
}

const actions = {
    follow: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollow: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    toggleFollowingProgress: (userId: number, state: boolean) => ({ type: 'TOGGLE_FOLLOWING_PROGRESS', userId, state } as const),
    setCurrentPage: (page: number) => ({ type: 'SET_CURRENT_PAGE', page } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
    setUsersTotalCount: (count: number) => ({ type: 'SET_USERS_TOTAL_COUNT', count } as const),
    toggleIsFetching: () => ({ type: 'TOGGLE_IS_FETCHING' } as const)
}

type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, ActionsType>
export const getUsersList = (
    currentPage: number,
    pageSize: number
): ThunkType => {
    return async (dispatch) => {
        try {
            dispatch(actions.toggleIsFetching())
            dispatch(actions.setCurrentPage(currentPage))
            const data = await UserAPI.getUsers(currentPage, pageSize)
            dispatch(actions.toggleIsFetching())
            dispatch(actions.setUsers(data.items))
            dispatch(actions.setUsersTotalCount(data.totalCount))
        } catch (error) {
            console.log(error)
        }
    }
}
export const followUser = (userId: number): ThunkType => {
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
export const unfollowUser = (userId: number): ThunkType => {
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
