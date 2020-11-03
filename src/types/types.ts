export type PhotosType = {
    small: string | null
    large: string | null
}
export type UserType = {
    id:                     number
    name:                   string
    status:                 string
    followed:               boolean
    followingInProgress?:   boolean
    photos:                 PhotosType
}
export type DialogType = {
    id:     number
    name:   string
}
export type MessageType = {
    id:     number
    text:   string
}
export type PostType = {
    id?:        number
    message:    string
}
export type ContactsType = {
    [key: string]: string
}
export type ProfileType = {
    userId:                     number
    aboutMe:                    string
    lookingForAJob:             boolean
    lookingForAJobDescription:  string
    fullName:                   string
    contacts:                   ContactsType
    photos:                     PhotosType
}
export type NavigationElementType = {
    id:     number
    link:   string
    name:   string
}
//functions
export type LoginType = (email: string, password: string, rememberMe: boolean, captcha: string) => void
export type LogoutType = () => void
export type UpdateStatusType = (newStatus: string) => void
export type UploadProfilePhotoType = (file: File) => void
export type SaveProfileType = (profileData: ProfileType) => void
export type SetUserType = (userId: number) => void
export type followUser = (id: number) => void
export type unfollowUser = (id: number) => void
