import { PhotosType, ProfileType } from "../types/types"
import { ResponseType, axiosInstance } from "./api"

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
        const response = await axiosInstance.put<ResponseType>(`profile/status`, { status })
        return response.data
    },
    async uploadProfilePhoto(file: File) {
        const formData = new FormData()
        formData.append("image", file)
        const response = await axiosInstance.put<ResponseType<PhotosType>>(`profile/photo`, formData)
        return response.data
    },
    async uploadProfileData(profileData: ProfileType) {
        const response = await axiosInstance.put<ResponseType>(`profile`, profileData)
        return response.data
    }
}
