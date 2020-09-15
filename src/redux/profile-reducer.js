import { ProfileAPI } from "../api/api"

const ADD_POST = 'ADD_POST'
const DELETE_POST = 'DELETE_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USER_STATUS = 'SET_USER_STATUS'

let initialState = {
    posts: [
        { id: 1, message: 'Message 1' },
        { id: 2, message: 'Message 2' },
        { id: 3, message: 'Messs 3' },
    ],
    profile: null,
    status: ''
}
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {
                    id: (state.posts.length + 1),
                    message: action.newPostText
                }]
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postID)
            }
        default:
            return state
    }
}

const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
})
const setUserStatus = (status) => ({
    type: SET_USER_STATUS,
    status
})
export const addPostActionCreator = newPostText => ({
    type: ADD_POST,
    newPostText
})
export const deletePostActionCreator = postID => ({
    type: DELETE_POST,
    postID
})
export const setUser = userId => {
    return dispatch => {
        dispatch(setUserProfile(null))
        ProfileAPI.getProfile(userId)
            .then(data => {
                dispatch(setUserProfile(data))
            })
            .catch(error => {
                console.log(error)
            })
        ProfileAPI.getStatus(userId)
            .then(data => {
                dispatch(setUserStatus(data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
export const updateStatus = status => {
    return dispatch => {
        ProfileAPI.updateStatus(status)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setUserStatus(status))
                }
            })
    }
}

export default profileReducer