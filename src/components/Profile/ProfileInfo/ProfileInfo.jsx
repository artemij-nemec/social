import React from 'react'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'
import defaultAvatar from '../../../assets/images/default_mini_avatar.jpg'
import { useState } from 'react'
import { ProfileDataReduxForm } from './ProfileDataForm'
import ProfileData from './ProfileData'

function ProfileInfo({ profile, status, updateStatus, isOwner, uploadProfilePhoto, saveProfile }) {
    let [editMode, setEditMode] = useState(false)
    const enableEditMode = () => setEditMode(true)
    const onSubmit = formData => {
        saveProfile(formData)
            .then(() => setEditMode(false))
            .catch(() => {})
    }
    return <div>
        <img
            src={profile.photos.large !== null ? profile.photos.large : defaultAvatar}
            alt="profile"
        />
        {editMode
            ? <ProfileDataReduxForm
                contacts={profile.contacts}
                initialValues={profile}
                onSubmit={onSubmit}
                uploadProfilePhoto={uploadProfilePhoto}
                isOwner={isOwner} />
            : <ProfileData
                profile={profile}
                enableEditMode={enableEditMode}
                isOwner={isOwner} />
        }
        <ProfileStatus
            status={status}
            updateStatus={updateStatus}
        />
    </div>
}

export const Contacts = ({ contacts }) => {
    const isContactAvaliable = Object.values(contacts).some(contactValue => !!contactValue)
    return isContactAvaliable
        ? <div>
            <b>Contacts: </b>
            {Object.keys(contacts).map(contactKey => contacts[contactKey]
                ? <div
                    key={contactKey}
                    className={s.paddingLeft10px}>
                    <b>{contactKey}: </b>{contacts[contactKey]}
                </div>
                : null
            )}
        </div>
        : null
}

export default ProfileInfo