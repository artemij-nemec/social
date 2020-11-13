import { FormAction, stopSubmit } from "redux-form"
import { ResponseCodes } from "../api/api"
import { ProfileAPI } from "../api/profile-api"
import { ContactsType, PhotosType, PostType, ProfileType, SetUserType } from "../types/types"
import { ActionTypes, ThunkType } from "./redux-store"

type ActionsType = ActionTypes<typeof actions>

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
        case 'ADD_POST':
            return {
                ...state,
                posts: [...state.posts, {
                    id: (state.posts.length + 1),
                    message: action.newPostText
                }]
            }
        case 'SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'SET_USER_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SET_PROFILE_PHOTO':
            if (state.profile) {
                return {
                    ...state,
                    profile: { ...state.profile, photos: action.photos }
                }
            } else {
                return state
            }
        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postID)
            }
        default:
            return state
    }
}

export const actions = {
    setUserProfile: (profile: ProfileType | null) => ({
        type: 'SET_USER_PROFILE',
        profile
    } as const),
    setUserStatus: (status: string) => ({
        type: 'SET_USER_STATUS',
        status
    } as const),
    setProfilePhoto: (photos: PhotosType) => ({
        type: 'SET_PROFILE_PHOTO',
        photos
    } as const),
    addPost: (newPostText: string) => ({
        type: 'ADD_POST',
        newPostText
    } as const),
    deletePost: (postID: number) => ({
        type: 'DELETE_POST',
        postID
    } as const)
}

export const setUser: SetUserType = (userId: number): ThunkType<ActionsType> => {
    return async dispatch => {
        try {
            dispatch(actions.setUserProfile(null))
            const profileData = await ProfileAPI.getProfile(userId)
            dispatch(actions.setUserProfile(profileData))
            const statusData = await ProfileAPI.getStatus(userId)
            dispatch(actions.setUserStatus(statusData))
        } catch (error) {
            console.log(error)
        }
    }
}
export const updateStatus = (status: string): ThunkType<ActionsType> => {
    return async dispatch => {
        try {
            const data = await ProfileAPI.updateStatus(status)
            if (data.resultCode === ResponseCodes.Success) {
                dispatch(actions.setUserStatus(status))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const uploadProfilePhoto = (photo: File): ThunkType<ActionsType> => {
    return async dispatch => {
        try {
            const data = await ProfileAPI.uploadProfilePhoto(photo)
            if (data.resultCode === ResponseCodes.Success) {
                dispatch(actions.setProfilePhoto(data.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const saveProfile = (profileData: ProfileType): ThunkType<ActionsType | FormAction> => {
    return async (dispatch, getState) => {
        try {
            const userId = getState().authReducer.userId
            const response = await ProfileAPI.uploadProfileData(profileData)
            if (response.resultCode === ResponseCodes.Success
                && userId !== null
            ) {
                dispatch(actions.setUserProfile(profileData))
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
