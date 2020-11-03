import React, { useState } from 'react'
import defaultAvatar from '../../../assets/images/default_mini_avatar.jpg'
import { ContactsType, ProfileType, SaveProfileType, UpdateStatusType, UploadProfilePhotoType } from '../../../types/types'
import ProfileData from './ProfileData'
import { ProfileDataReduxForm } from './ProfileDataForm'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'

type ProfileInfoPropsType = {
    status:             string
    profile:            ProfileType
    isOwner:            boolean
    updateStatus:       UpdateStatusType
    uploadProfilePhoto: UploadProfilePhotoType
    saveProfile:        SaveProfileType
}
const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
    profile,
    status,
    updateStatus,
    isOwner,
    uploadProfilePhoto,
    saveProfile
}) => {
    let [editMode, setEditMode] = useState(false)
    const enableEditMode = () => setEditMode(true)
    const onSubmit = (profileData: ProfileType) => {
        saveProfile(profileData)
        // setEditMode(false)
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

type ContactsPropsType = {
    contacts: ContactsType
}
export const Contacts: React.FC<ContactsPropsType> = ({ contacts }) => {
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