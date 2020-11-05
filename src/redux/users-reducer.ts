import { ThunkAction } from "redux-thunk"
import { ResponseCodes, UserAPI } from "../api/api"
import { UserType } from "../types/types"
import { RootStateType } from "./redux-store"


const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE'
const SET_USERS_TOTAL_COUNT = 'users/SET_USERS_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_PROGRESS = 'users/TOGGLE_FOLLOWING_PROGRESS'

let initialState = {
    users:              [] as Array<UserType>,
    pageSize:           10,
    totalUsersCount:    0,
    currentPage:        1,
    isFetching:         false
}
export type UsersStateType = typeof initialState
type ActionsType = FollowActionType
| UnfollowActionType
| ToggleFollowingProgressActionType
| SetCurrentPageActionType
| SetUsersActionType
| SetUsersTotalCountActionType
| ToggleIsFetchingActionType

const usersReducer = (
    state = initialState,
    action: ActionsType
): UsersStateType => {
    switch (action.type) {
        case FOLLOW:
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
        case UNFOLLOW:
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
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case SET_USERS_TOTAL_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: !state.isFetching
            }
        case TOGGLE_FOLLOWING_PROGRESS:
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
type FollowActionType = {
    type:   typeof FOLLOW
    userId: number
}
type UnfollowActionType = {
    type:   typeof UNFOLLOW
    userId: number
}
type ToggleFollowingProgressActionType = {
    type:   typeof TOGGLE_FOLLOWING_PROGRESS
    userId: number
    state:  boolean
}
type SetCurrentPageActionType = {
    type:   typeof SET_CURRENT_PAGE
    page:   number
}
type SetUsersActionType = {
    type:   typeof SET_USERS
    users:  Array<UserType>
}
type SetUsersTotalCountActionType = {
    type:   typeof SET_USERS_TOTAL_COUNT
    count:  number
}
type ToggleIsFetchingActionType = {
    type:   typeof TOGGLE_IS_FETCHING
}

const follow = (userId: number): FollowActionType => ({ type: FOLLOW, userId })
const unfollow = (userId: number): UnfollowActionType => ({ type: UNFOLLOW, userId })
const toggleFollowingProgress = (userId: number, state: boolean): ToggleFollowingProgressActionType => ({ type: TOGGLE_FOLLOWING_PROGRESS, userId, state })
const setCurrentPage = (page: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, page })
const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users })
const setUsersTotalCount = (count: number): SetUsersTotalCountActionType => ({ type: SET_USERS_TOTAL_COUNT, count })
const toggleIsFetching = (): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING })

type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, ActionsType>
export const getUsersList = (
    currentPage: number,
    pageSize: number
): ThunkType => {
    return async (dispatch) => {
        try {
            dispatch(toggleIsFetching())
            dispatch(setCurrentPage(currentPage))
            const data = await UserAPI.getUsers(currentPage, pageSize)
            dispatch(toggleIsFetching())
            dispatch(setUsers(data.items))
            dispatch(setUsersTotalCount(data.totalCount))
        } catch (error) {
            console.log(error)
        }
    }
}
export const followUser = (userId: number): ThunkType => {
    return async (dispatch) => {
        try {
            dispatch(toggleFollowingProgress(userId, true))
            const data = await UserAPI.follow(userId)
            if (data.resultCode === ResponseCodes.Success) {
                dispatch(follow(userId))
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(toggleFollowingProgress(userId, false))
        }
    }
}
export const unfollowUser = (userId: number): ThunkType => {
    return async (dispatch) => {
        try {
            dispatch(toggleFollowingProgress(userId, true))
            const data = await UserAPI.unfollow(userId)
            if (data.resultCode === ResponseCodes.Success) {
                dispatch(unfollow(userId))
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(toggleFollowingProgress(userId, false))
        }
    }
}

export default usersReducer
