import { FormAction, stopSubmit } from "redux-form"
import { ThunkAction } from "redux-thunk"
import { ProfileAPI, ResponseCodes } from "../api/api"
import { ContactsType, PhotosType, PostType, ProfileType, SetUserType } from "../types/types"
import { RootStateType } from "./redux-store"

const ADD_POST = 'ADD_POST'
const DELETE_POST = 'DELETE_POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_USER_STATUS = 'SET_USER_STATUS'
const SET_PROFILE_PHOTO = 'SET_PROFILE_PHOTO'


type ActionsType = SetUserProfileActionType
    | SetUserStatusActionType
    | SetUserPhotosActionType
    | AddPostActionType
    | DeletePostActionType

let initialState = {
    posts: [
        { id: 1, message: 'Message 1' },
        { id: 2, message: 'Message 2' },
        { id: 3, message: 'Messs 3' },
    ] as Array<PostType>,
    profile: null as null | ProfileType,
    status: ''
}
export type ProfileStateType = typeof initialState
const profileReducer = (
    state = initialState,
    action: ActionsType
): ProfileStateType => {
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
            if (state.profile) {
                return {
                    ...state,
                    profile: { ...state.profile, photos: action.photos }
                }
            } else {
                return state
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

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType | null
}
type SetUserStatusActionType = {
    type: typeof SET_USER_STATUS
    status: string
}
type SetUserPhotosActionType = {
    type: typeof SET_PROFILE_PHOTO
    photos: PhotosType
}
type AddPostActionType = {
    type: typeof ADD_POST
    newPostText: string
}
type DeletePostActionType = {
    type: typeof DELETE_POST
    postID: number
}

const setUserProfile = (profile: ProfileType | null): SetUserProfileActionType => ({
    type: SET_USER_PROFILE,
    profile
})
const setUserStatus = (status: string): SetUserStatusActionType => ({
    type: SET_USER_STATUS,
    status
})
const setProfilePhoto = (photos: PhotosType): SetUserPhotosActionType => ({
    type: SET_PROFILE_PHOTO,
    photos
})
export const addPostActionCreator = (newPostText: string): AddPostActionType => ({
    type: ADD_POST,
    newPostText
})
export const deletePostActionCreator = (postID: number): DeletePostActionType => ({
    type: DELETE_POST,
    postID
})
type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, ActionsType>

export const setUser: SetUserType = (userId: number): ThunkType => {
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
export const updateStatus = (status: string): ThunkType => {
    return async dispatch => {
        try {
            const data = await ProfileAPI.updateStatus(status)
            if (data.resultCode === ResponseCodes.Success) {
                dispatch(setUserStatus(status))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const uploadProfilePhoto = (photo: File): ThunkType => {
    return async dispatch => {
        try {
            const data = await ProfileAPI.uploadProfilePhoto(photo)
            if (data.resultCode === ResponseCodes.Success) {
                dispatch(setProfilePhoto(data.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const saveProfile = (profileData: ProfileType): ThunkAction<Promise<void>, RootStateType, unknown, ActionsType | FormAction> => {
    return async dispatch => {
        try {
            const response = await ProfileAPI.uploadProfileData(profileData)
            if (response.resultCode === ResponseCodes.Success) {
                dispatch(setUserProfile(profileData))
            } else {
                const message = response.messages.length > 0 && response.messages[0]
                    ? response.messages[0]
                    : "Unknown error"
                const errors = getErrorObjectFromMessage(message)
                dispatch(stopSubmit('edit-profile', errors))
                return Promise.reject(message)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

type ErrorMessageType = { _error: string } | { contacts: ContactsType }
const getErrorObjectFromMessage = (message: string): ErrorMessageType => {
    const contacts = message.match(/\(Contacts->(.*)\)/)
    if (contacts && contacts[1]) {
        const contactField = contacts[1].toLowerCase()
        return {
            contacts: {
                [contactField]: message
            }
        }
    } else {
        return { _error: message }
    }
}

export default profileReducer
