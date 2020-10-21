import { AuthAPI, SecurityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL'

let initialState = {
    userId: null,
    login: null,
    email: null,
    isLoading: false,
    isAuth: false,
    captchaUrl: null
}

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        case SET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state
    }
};

export const setUserData = (userId, login, email, isAuth = false) => ({
    type: SET_USER_DATA,
    data: { userId, login, email, isAuth }
})
export const setCaptchaUrl = captchaUrl => ({
    type: SET_CAPTCHA_URL,
    captchaUrl
})
export const authMe = () => {
    return async dispatch => {
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
export const login = (email, password, rememberMe, captcha) => {
    return async dispatch => {
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
export const logout = () => {
    return async dispatch => {
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
    return async dispatch => {
        try {
            const url = await SecurityAPI.getCaptchaUrl()
            dispatch(setCaptchaUrl(url))
        } catch (error) {
            console.log(error)
        }
    }
}

export default authReducer