import React from 'react';
import s from './ProfileInfo.module.css';
import { Contacts } from './ProfileInfo';

const ProfileData = ({ profile, enableEditMode, isOwner }) => {
    return <div>
        {isOwner && <div><button onClick={enableEditMode}>Edit profile</button></div>}
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