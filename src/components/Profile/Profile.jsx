import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import Preloader from '../Common/Preloader/Preloader'

function Profile({ profile, status, updateStatus }) {
    return (profile ?
        <div>
            <ProfileInfo
                profile={profile}
                status={status}
                updateStatus={updateStatus}
            />
            <MyPostsContainer />
        </div>
        :
        <Preloader />
    )
}

export default Profile