import { ResponseCodes, ResponseCodesCaptcha } from "../api/api"
import { AuthAPI } from "../api/auth-api"
import { SecurityAPI } from "../api/security-api"
import { AlertActionsType, alertsActions } from "./alerts-reducer"
import { ActionTypes, ThunkType } from "./redux-store"

let initialState = {
    userId:     null as number | null,
    login:      null as string | null,
    email:      null as string | null,
    isLoading:  false as boolean,
    isAuth:     false as boolean,
    captchaUrl: null as string | null
}
export type AuthStateType = typeof initialState

type ActionsType = ActionTypes<typeof actions>

let authReducer = (state = initialState, action: ActionsType): AuthStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                ...action.data
            }
        case 'SET_CAPTCHA_URL':
            return {
                ...state,
                captchaUrl: action.data
            }
        default:
            return state
    }
}

export const actions = {
    setUserData: (userId: number | null, login: string | null, email: string | null, isAuth = false) => ({
        type: 'SET_USER_DATA',
        data: { userId, login, email, isAuth }
    } as const),
    setCaptchaUrl: (captchaUrl: string) => ({
        type: 'SET_CAPTCHA_URL',
        data: captchaUrl
    } as const)
}
export const authMe = (): ThunkType<ActionsType> => {
    return async dispatch => {
        try {
            const data = await AuthAPI.authMe()
            if (data.resultCode === ResponseCodes.Success) {
                let { id, login, email } = data.data
                dispatch(actions.setUserData(id, login, email, true))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export type LoginType = (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
) => ThunkType<ActionsType | AlertActionsType>
export const login: LoginType = (email, password, rememberMe, captcha) => {
    return async dispatch => {
        try {
            const data = await AuthAPI.login(email, password, rememberMe, captcha)
            if (data.resultCode === ResponseCodes.Success) {
                dispatch(alertsActions.addSuccessAllert("Authorized successfully"))
                dispatch(authMe())
            } else {
                if (data.resultCode === ResponseCodesCaptcha.CaptchaRequired) {
                    dispatch(getCaptchaUrl())
                }
                let message = data.messages.length > 0 && data.messages[0]
                    ? data.messages[0]
                    : "Unknown error"
                    dispatch(alertsActions.addErrorAllert(message))
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export type LogoutType = () => ThunkType<ActionsType | AlertActionsType>
export const logout: LogoutType = () => {
    return async dispatch => {
        try {
            const data = await AuthAPI.logout()
            if (data.resultCode === ResponseCodes.Success) {
                dispatch(actions.setUserData(null, null, null, false))
            }
        } catch (error) {
            dispatch(alertsActions.addErrorAllert(error))
        }
    }
}
export const getCaptchaUrl = (): ThunkType<ActionsType | AlertActionsType> => {
    return async dispatch => {
        try {
            const url = await SecurityAPI.getCaptchaUrl()
            dispatch(actions.setCaptchaUrl(url))
        } catch (error) {
            dispatch(alertsActions.addErrorAllert(error))
        }
    }
}

export default authReducer