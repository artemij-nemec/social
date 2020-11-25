import React from 'react'
import { useSelector } from 'react-redux'
import { RootStateType } from '../../redux/redux-store'
import Preloader from '../Common/Preloader/Preloader'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile: React.FC<{isOwner: boolean}> = ({ isOwner }) => {
    const profile = useSelector((state: RootStateType) => state.profileReducer.profile)

    return (profile ?
        <div>
            <ProfileInfo
                profile={profile}
                isOwner={isOwner}
            />
            <MyPostsContainer />
        </div>
        :
        <Preloader />
    )
}

export default Profile