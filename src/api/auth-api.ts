import { ResponseType, ResponseCodes, ResponseCodesCaptcha, axiosInstance } from "./api"

type AuthMeDataType = {
        id: number
        email: string
        login: string
}
type LoginDataType = {
        userId: number
}

export const AuthAPI = {
    async authMe() {
        const response = await axiosInstance.get<ResponseType<AuthMeDataType>>(`auth/me`)
        return response.data
    },
    async login(email: string, password: string, rememberMe = false, captcha = '') {
        const response = await axiosInstance.post<ResponseType<LoginDataType, ResponseCodes | ResponseCodesCaptcha>>(`auth/login`, { email, password, rememberMe, captcha })
        return response.data
    },
    async logout() {
        const response = await axiosInstance.delete<ResponseType>(`auth/login`)
        return response.data
    }
}
