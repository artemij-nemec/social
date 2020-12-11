import { ResponseCodes } from "../api/api"
import { ProfileAPI } from "../api/profile-api"
import { PhotosType, PostType, ProfileType, SetUserType } from "../types/types"
import { AlertActionsType, alertsActions } from "./alerts-reducer"
import { ActionTypes, ThunkType } from "./redux-store"

type ActionsType = ActionTypes<typeof actions>

let initialState = {
    posts: [
        { id: 1, message: 'Message 1' },
        { id: 2, message: 'Message 2' },
        { id: 3, message: 'Messs 3' },
    ] as Array<PostType>,
    profile: null as null | ProfileType,
    isUpdating: false,
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
        case 'CHANGE_UPDATING_STATUS':
            return {
                ...state,
                isUpdating: action.isUpdating
            }
        default:
            return state
    }
}
const actions = {
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
    } as const),
    setUpdating: (isUpdating: boolean) => ({
        type: 'CHANGE_UPDATING_STATUS',
        isUpdating
    } as const)
}
export { actions as profileActions }
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
                dispatch(actions.setProfilePhoto(data.data.photos))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const saveProfile = (profileData: ProfileType): ThunkType<ActionsType | AlertActionsType> => {
    return async (dispatch, getState) => {
        try {
            const userId = getState().authReducer.userId
            const response = await ProfileAPI.uploadProfileData(profileData)
            if (response.resultCode === ResponseCodes.Success
                && userId !== null
            ) {
                const newProfileData = await ProfileAPI.getProfile(userId)
                dispatch(actions.setUserProfile(newProfileData))
            } else {
                const message = response.messages.length > 0 && response.messages[0]
                    ? response.messages[0]
                    : "Unknown error"
                dispatch(alertsActions.addErrorAllert(message))
                return Promise.reject(message)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default profileReducer
