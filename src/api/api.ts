import Axios from "axios"
import { PhotosType, ProfileType, UserType } from "../types/types"

const axiosInstance = Axios.create({
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
export const ResponseCodesCaptcha = {
    ...ResponseCodes,
    CaptchaRequired: 10
}
type DefaultResponce = {
    resultCode: ResponseCodes
    messages:   Array<string>
}

type GetUsersType = {
    items:      Array<UserType>
    totalCount: number
    error:      string
}
type UnfollowType = DefaultResponce & {
    data: {}
}
type FollowType = DefaultResponce & {
    data: {}
}
export const UserAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        const response = await axiosInstance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
        return response.data
    },
    async unfollow(userId = 0) {
        const response = await axiosInstance.delete<UnfollowType>(`follow/${userId}`)
        return response.data
    },
    async follow(userId = 0) {
        const response = await axiosInstance.post<FollowType>(`follow/${userId}`)
        return response.data
    }
}

type AuthMeType = DefaultResponce & {
    data: {
        id:     number
        email:  string
        login:  string
    }
}
type LoginType = DefaultResponce & {
    data: {
        userId:     number
    }
    resultCode: typeof ResponseCodesCaptcha
}
type LogoutType = DefaultResponce & {
    data: {}
}
export const AuthAPI = {
    async authMe() {
        const response = await axiosInstance.get<AuthMeType>(`auth/me`)
        return response.data
    },
    async login(email: string, password: string, rememberMe = false, captcha = '') {
        const response = await axiosInstance.post<LoginType>(`auth/login`, { email, password, rememberMe, captcha })
        return response.data
    },
    async logout() {
        const response = await axiosInstance.delete<LogoutType>(`auth/login`)
        return response.data
    }
}

type UpdateStatusType = DefaultResponce & {
    data: {}
}
type UploadProfilePhotoType = DefaultResponce & {
    data: PhotosType
}
type UploadProfileDataType = DefaultResponce & {
    data: {}
}
export const ProfileAPI = {
    async getProfile(userId = 0) {
        const response = await axiosInstance.get<ProfileType>(`profile/${userId}`)
        return response.data
    },
    async getStatus(userId = 0) {
        const response = await axiosInstance.get<string>(`profile/status/${userId}`)
        return response.data
    },
    async updateStatus(status = '') {
        const response = await axiosInstance.put<UpdateStatusType>(`profile/status`, { status })
        return response.data
    },
    async uploadProfilePhoto(file: File) {
        const formData = new FormData()
        formData.append("image", file)
        const response = await axiosInstance.put<UploadProfilePhotoType>(`profile/photo`, formData)
        return response.data
    },
    async uploadProfileData(profileData: ProfileType) {
        const response = await axiosInstance.put<UploadProfileDataType>(`profile`, profileData)
        return response.data
    }
}

type GetCaptchaUrlType = {
    url: string
}
export const SecurityAPI = {
    async getCaptchaUrl() {
        const response = await axiosInstance.get<GetCaptchaUrlType>('/security/get-captcha-url')
        return response.data.url
    }
}
