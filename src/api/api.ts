import Axios from "axios"

export const axiosInstance = Axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "f75fd89d-e292-4333-a61e-509d4730e17d"
    }
})

export enum ResponseCodes {
    Success = 0,
    Error   = 1
}
export enum ResponseCodesCaptcha {
    CaptchaRequired = 10
}
export type ResponseType<D = {}, RC = ResponseCodes> = {
    data:       D
    resultCode: RC
    messages:   Array<string>
}
