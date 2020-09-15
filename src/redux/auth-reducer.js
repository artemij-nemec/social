import { AuthAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA'

let initialState = {
    userId: null,
    login: null,
    email: null,
    isLoading: false,
    isAuth: false
}

let authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
};

export const setUserData = (userId, login, email, isAuth = false) => ({
    type: SET_USER_DATA,
    data: { userId, login, email, isAuth }
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
export const login = (email, password, rememberMe) => {
    return async dispatch => {
        try {
            const data = await AuthAPI.login(email, password, rememberMe)
            if (data.resultCode === 0) {
                dispatch(authMe())
            } else {
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

export default authReducer