import { RootStateType } from "./redux-store"

export const getIsAuth = (state: RootStateType) => state.authReducer.isAuth
export const getLogin = (state: RootStateType) => state.authReducer.login
export const getCaptchaUrl = (state: RootStateType) => state.authReducer.captchaUrl
export const getAuthorizedUserId = (state: RootStateType) => state.authReducer.userId
