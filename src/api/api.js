import Axios from "axios"

const axiosInstance = Axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        "API-KEY": "f75fd89d-e292-4333-a61e-509d4730e17d"
    }
})

export const UserAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollow(userId = 0) {
        return axiosInstance.delete(`follow/${userId}`)
            .then(response => response.data)
    },
    follow(userId = 0) {
        return axiosInstance.post(`follow/${userId}`)
            .then(response => response.data)
    }
}

export const AuthAPI = {
    authMe() {
        return axiosInstance.get(`auth/me`)
            .then(response => response.data)
    },
    login(email, password, rememberMe = false) {
        return axiosInstance.post(`auth/login`, { email, password, rememberMe })
            .then(response => response.data)
    },
    logout() {
        return axiosInstance.delete(`auth/login`)
            .then(response => response.data)
    }
}

export const ProfileAPI = {
    getProfile(userId = 0) {
        return axiosInstance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getStatus(userId = 0) {
        return axiosInstance.get(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status = '') {
        return axiosInstance.put(`profile/status`, { status })
            .then(response => response.data)
    }
}
