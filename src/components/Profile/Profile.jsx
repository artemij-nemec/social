import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import Preloader from '../Common/Preloader/Preloader'

function Profile({ profile, status, updateStatus, isOwner, uploadProfilePhoto }) {
    return (profile ?
        <div>
            <ProfileInfo
                profile={profile}
                status={status}
                updateStatus={updateStatus}
                isOwner={isOwner}
                uploadProfilePhoto={uploadProfilePhoto}
            />
            <MyPostsContainer />
        </div>
        :
        <Preloader />
    )
}

export default Profile