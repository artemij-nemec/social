import { UserAPI } from "../api/api"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS'

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
}

const usersReducer = (state = initialState, action) => {
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

const follow = userId => ({ type: FOLLOW, userId })
const unfollow = userId => ({ type: UNFOLLOW, userId })
const toggleFollowingProgress = (userId, state) => ({ type: TOGGLE_FOLLOWING_PROGRESS, userId, state })
const setCurrentPage = page => ({ type: SET_CURRENT_PAGE, page })
const setUsers = users => ({ type: SET_USERS, users })
const setUsersTotalCount = count => ({ type: SET_USERS_TOTAL_COUNT, count })
const toggleIsFetching = () => ({ type: TOGGLE_IS_FETCHING })

export const getUsersList = (currentPage, pageSize) => {
    return async dispatch => {
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
export const followUser = (userId) => {
    return async dispatch => {
        try {
            dispatch(toggleFollowingProgress(userId, true))
            const data = await UserAPI.follow(userId)
            if (data.resultCode === 0) {
                dispatch(follow(userId))
            }
        } catch (error) {
            console.log(error)
        } finally {
            dispatch(toggleFollowingProgress(userId, false))
        }
    }
}
export const unfollowUser = (userId) => {
    return async dispatch => {
        try {
            dispatch(toggleFollowingProgress(userId, true))
            const data = await UserAPI.unfollow(userId)
            if (data.resultCode === 0) {
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
