import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import Preloader from '../Common/Preloader/Preloader'

function Profile({ profile, status, updateStatus, isOwner, uploadProfilePhoto, saveProfile }) {
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