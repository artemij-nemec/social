import { UserType } from "../types/types"
import { ResponseType, axiosInstance } from "./api"

type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

export const UserAPI = {
    async getUsers(currentPage = 1, pageSize = 10, term = '', friend: boolean | undefined) {
        let url = `users?page=${currentPage}&count=${pageSize}`
        if (term)
        {
            url += `&term=${term}`
        }
        if (typeof friend !== 'undefined')
        {
            url += `&friend=${friend}`
        }
        const response = await axiosInstance.get<GetUsersType>(url)
        return response.data
    },
    async unfollow(userId = 0) {
        const response = await axiosInstance.delete<ResponseType>(`follow/${userId}`)
        return response.data
    },
    async follow(userId = 0) {
        const response = await axiosInstance.post<ResponseType>(`follow/${userId}`)
        return response.data
    }
}
