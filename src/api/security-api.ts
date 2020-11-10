import { axiosInstance } from "./api"

type GetCaptchaUrlType = {
    url: string
}
export const SecurityAPI = {
    async getCaptchaUrl() {
        const response = await axiosInstance.get<GetCaptchaUrlType>('/security/get-captcha-url')
        return response.data.url
    }
}
