import React from 'react'
import { ProfileType, SaveProfileType, UpdateStatusType, UploadProfilePhotoType } from '../../types/types'
import Preloader from '../Common/Preloader/Preloader'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'

type PropsType = {
    profile:            ProfileType | null
    status:             string
    isOwner:            boolean
    updateStatus:       UpdateStatusType
    uploadProfilePhoto: UploadProfilePhotoType
    saveProfile:        SaveProfileType
}
const Profile: React.FC<PropsType> = ({
    profile,
    status,
    isOwner,
    updateStatus,
    uploadProfilePhoto,
    saveProfile
}) => {
    return (profile ?
        <div>
            <ProfileInfo
                profile={profile}
                status={status}
                updateStatus={updateStatus}
                isOwner={isOwner}
                uploadProfilePhoto={uploadProfilePhoto}
                saveProfile={saveProfile}
            />
            <MyPostsContainer />
        </div>
        :
        <Preloader />
    )
}

export default Profile