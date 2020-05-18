import React from 'react'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'
import defaultAvatar from '../../../assets/images/default_mini_avatar.jpg'

function ProfileInfo(props) {
    return <div>
        <img
            src={props.profile.photos.large !== null ? props.profile.photos.large : defaultAvatar}
            alt="profile"
        />
        <h2>Description</h2>
        <ProfileStatus
            status={props.status}
            updateStatus={props.updateStatus}
        />
    </div>
}

export default ProfileInfo