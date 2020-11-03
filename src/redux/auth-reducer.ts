import { AuthAPI, SecurityAPI } from "../api/api"
import { stopSubmit } from "redux-form"
import { LoginType, LogoutType } from "../types/types"

const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL'

let initialState = {
    userId:     null as number | null,
    login:      null as string | null,
    email:      null as string | null,
    isLoading:  false as boolean,
    isAuth:     false as boolean,
    captchaUrl: null as string | null
}
export type AuthStateType = typeof initialState
type AuthSetUserDataType = {
    userId: number | null
    login:  string | null
    email:  string | null
    isAuth: boolean
}
type AuthSetUserDataActionType = {
    type:       typeof SET_USER_DATA
    data:       AuthSetUserDataType
}
type AuthSetCaptchaUrlActionType = {
    type:       typeof SET_CAPTCHA_URL
    data:       string
}

let authReducer = (state = initialState, action: AuthSetUserDataActionType | AuthSetCaptchaUrlActionType): AuthStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.data
            }
        default:
            return state
    }
}

export const setUserData = (userId: number | null, login: string | null, email: string | null, isAuth = false): AuthSetUserDataActionType => ({
    type: SET_USER_DATA,
    data: { userId, login, email, isAuth }
})
export const setCaptchaUrl = (captchaUrl: string): AuthSetCaptchaUrlActionType => ({
    type: SET_CAPTCHA_URL,
    data: captchaUrl
})
export const authMe = () => {
    return async (dispatch: any) => {
        try {
            const data = await AuthAPI.authMe()
            if (data.resultCode === 0) {
                let { id, login, email } = data.data
                dispatch(setUserData(id, login, email, true))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const login: LoginType = (email, password, rememberMe, captcha) => {
    return async (dispatch: any) => {
        try {
            const data = await AuthAPI.login(email, password, rememberMe, captcha)
            if (data.resultCode === 0) {
                dispatch(authMe())
            } else {
                if (data.resultCode === 10) {
                    dispatch(getCaptchaUrl())
                }
                let message = data.messages.length > 0 && data.messages[0]
                    ? data.messages[0]
                    : "Unknown error"
                    dispatch(stopSubmit('login', { _error: message }))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const logout: LogoutType = () => {
    return async (dispatch: any) => {
        try {
            const data = await AuthAPI.logout()
            if (data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const getCaptchaUrl = () => {
    return async (dispatch: any) => {
        try {
            const url = await SecurityAPI.getCaptchaUrl()
            dispatch(setCaptchaUrl(url))
        } catch (error) {
            console.log(error)
        }
    }
}

export default authReducer