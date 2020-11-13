import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { ContactsType, ProfileType, UploadProfilePhotoType } from '../../../types/types'
import { Input, TextArea } from '../../Common/FormControls/FormControls'
import s from './ProfileInfo.module.css'

type OwnPropsType = {
    contacts:           ContactsType
    isOwner:            boolean
    uploadProfilePhoto: UploadProfilePhotoType
}
type FormType = ProfileType

const ProfileDataForm: React.FC<OwnPropsType &
    InjectedFormProps<FormType, OwnPropsType>
> = ({
    contacts,
    uploadProfilePhoto,
    isOwner,
    handleSubmit,
    error
}) => {
    const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            uploadProfilePhoto(e.target.files[0])
        }
    }

    return <form onSubmit={handleSubmit} className={s.loginForm}>
        {isOwner && <div><button type="submit" className={s.loginButton}>Save changes</button></div>}
        <div>
            <input type="file" onChange={onFileSelected} />
        </div>
        {error &&
            <div className={s.formError}>
                {error}
            </div>
        }
        <div><b>Full name: </b>
            <Field
                name="fullName"
                component={Input}
                validate={[]}
                type="text"
                placeholder="Full name"
            />
        </div>
        <div><b>About me: </b>
            <Field
                name="aboutMe"
                component={Input}
                validate={[]}
                type="text"
                placeholder="About me"
            />
        </div>
        <div>
            <b>Looking for a job: </b>
            <div>
                <Field
                    name="lookingForAJob"
                    component="input"
                    type="checkbox"
                />
                <label htmlFor="lookingForAJob">Looking for a job</label>
            </div>
            <div className={s.paddingLeft10px}>
                <b>Description: </b>
                <Field
                    name="lookingForAJobDescription"
                    component={TextArea}
                    validate={[]}
                    type="text"
                    placeholder="Description"
                />
            </div>
        </div>
        <b>Contacts: </b>
        {Object.keys(contacts).map(contactKey => <div
                key={contactKey}
                className={s.paddingLeft10px}>
                <b>{contactKey}: </b>
                <Field
                    name={"contacts." + contactKey}
                    component={Input}
                    validate={[]}
                    type="text"
                />
            </div>
        )}
    </form>
}

export const ProfileDataReduxForm = reduxForm<FormType, OwnPropsType>({
    form: 'edit-profile'
})(ProfileDataForm)