import { Button } from 'antd';
import React from 'react';
import { ProfileType } from '../../../types/types';
import { Contacts } from './ProfileInfo';
import s from './ProfileInfo.module.css';

type PropsType = {
    profile:        ProfileType
    isOwner:        boolean
    enableEditMode: () => void
}
const ProfileData: React.FC<PropsType> = ({ profile, enableEditMode, isOwner }) => {
    return <div>
        {isOwner && <div className={s.editButtonContainer}><Button onClick={enableEditMode}>Edit profile</Button></div>}
        <div><b>Full name: </b>{profile.fullName}</div>
        <div><b>About me: </b>{profile.aboutMe}</div>
        <div>
            <b>Looking for a job: </b>{profile.lookingForAJob ? 'yes' : 'no'}
            {profile.lookingForAJob && profile.lookingForAJobDescription &&
                <div className={s.paddingLeft10px}><b>Description: </b>{profile.lookingForAJobDescription}</div>}
        </div>
        <Contacts contacts={profile.contacts} />
    </div>
}

export default ProfileData