import Axios from "axios"

const axiosInstance = Axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "f75fd89d-e292-4333-a61e-509d4730e17d"
    }
})

export const UserAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        const response = await axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`)
        return response.data
    },
    async unfollow(userId = 0) {
        const response = await axiosInstance.delete(`follow/${userId}`)
        return response.data
    },
    async follow(userId = 0) {
        const response = await axiosInstance.post(`follow/${userId}`)
        return response.data
    }
}

export const AuthAPI = {
    async authMe() {
        const response = await axiosInstance.get(`auth/me`)
        return response.data
    },
    async login(email, password, rememberMe = false, captcha = '') {
        const response = await axiosInstance.post(`auth/login`, { email, password, rememberMe, captcha })
        return response.data
    },
    async logout() {
        const response = await axiosInstance.delete(`auth/login`)
        return response.data
    }
}

export const ProfileAPI = {
    async getProfile(userId = 0) {
        const response = await axiosInstance.get(`profile/${userId}`)
        return response.data
    },
    async getStatus(userId = 0) {
        const response = await axiosInstance.get(`profile/status/${userId}`)
        return response.data
    },
    async updateStatus(status = '') {
        const response = await axiosInstance.put(`profile/status`, { status })
        return response.data
    },
    async uploadProfilePhoto(file) {
        const formData = new FormData()
        formData.append("image", file)
        const response = await axiosInstance.put(`profile/photo`, formData)
        return response.data
    },
    async uploadProfileData(profileData) {
        const response = await axiosInstance.put(`profile`, profileData)
        return response.data
    }
}

export const SecurityAPI = {
    async getCaptchaUrl() {
        const response = await axiosInstance.get('/security/get-captcha-url')
        return response.data.url
    }
}
