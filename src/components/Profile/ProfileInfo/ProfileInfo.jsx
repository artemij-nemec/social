import React from 'react'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'
import defaultAvatar from '../../../assets/images/default_mini_avatar.jpg'

function ProfileInfo({ profile, status, updateStatus, isOwner, uploadProfilePhoto }) {
    const onFileSelected = e => {
        if (e.target.files.length) {
            uploadProfilePhoto(e.target.files[0])
        }
    }
    return <div>
        <img
            src={profile.photos.large !== null ? profile.photos.large : defaultAvatar}
            alt="profile"
        />
        <div>
            {isOwner && <input type="file" onChange={onFileSelected} />}
        </div>
        <h2>Description</h2>
        <ProfileStatus
            status={status}
            updateStatus={updateStatus}
        />
    </div>
}

export default ProfileInfo