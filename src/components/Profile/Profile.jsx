import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import Preloader from '../Common/Preloader/Preloader'

function Profile(props) {
    return (props.profile ?
        <div>
            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
            />
            <MyPostsContainer />
        </div>
        :
        <Preloader />
    )
}

export default Profile