import { ProfileAPI } from "../api/api"

const ADD_POST = 'ADD_POST'
const DELETE_POST = 'DELETE_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USER_STATUS = 'SET_USER_STATUS'
const SET_PROFILE_PHOTO = 'SET_PROFILE_PHOTO'

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
        case SET_PROFILE_PHOTO:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos }
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

const setUserProfile = profile => ({
    type: SET_USER_PROFILE,
    profile
})
const setUserStatus = status => ({
    type: SET_USER_STATUS,
    status
})
const setProfilePhoto = photos => ({
    type: SET_PROFILE_PHOTO,
    photos
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
    return async dispatch => {
        try {
            dispatch(setUserProfile(null))
            const profileData = await ProfileAPI.getProfile(userId)
            dispatch(setUserProfile(profileData))
            const statusData = await ProfileAPI.getStatus(userId)
            dispatch(setUserStatus(statusData))
        } catch (error) {
            console.log(error)
        }
    }
}
export const updateStatus = status => {
    return async dispatch => {
        try {
            const data = await ProfileAPI.updateStatus(status)
            if (data.resultCode === 0) {
                dispatch(setUserStatus(status))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const uploadProfilePhoto = photo => {
    return async dispatch => {
        try {
            const response = await ProfileAPI.uploadProfilePhoto(photo)
            if (response.resultCode === 0) {
                dispatch(setProfilePhoto(response.data.photos))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default profileReducer