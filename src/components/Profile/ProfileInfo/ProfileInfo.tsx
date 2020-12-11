import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import defaultAvatar from '../../../assets/images/default_mini_avatar.jpg'
import { profileActions, saveProfile } from '../../../redux/profile-reducer'
import { ContactsType, ProfileType } from '../../../types/types'
import ProfileData from './ProfileData'
import { ProfileDataForm } from './ProfileDataForm'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'

type PropsType = {
    profile:    ProfileType
    isOwner:    boolean
}
const ProfileInfo: React.FC<PropsType> = ({ profile, isOwner }) => {
    let [editMode, setEditMode] = useState(false)
    const enableEditMode = () => setEditMode(true)
    const dispatch = useDispatch()
    const onSubmit = async (profileData: ProfileType) => {
        dispatch(profileActions.setUpdating(true))
        await dispatch(saveProfile(profileData))
        dispatch(profileActions.setUpdating(false))
        setEditMode(false)
    }

    return <div className={s.profileContainer}>
        <div className={s.imgContainer}>
            <img
                src={profile?.photos?.large ? profile.photos.large : defaultAvatar}
                alt="profile"
            />
        </div>
        <div className={s.profileDataContainer}>
            {editMode
                ? <ProfileDataForm
                    contacts={profile.contacts}
                    initialValues={profile}
                    onSubmit={onSubmit}
                    isOwner={isOwner} />
                : <ProfileData
                    profile={profile}
                    enableEditMode={enableEditMode}
                    isOwner={isOwner} />
            }
            <ProfileStatus isOwner={isOwner} />
        </div>
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