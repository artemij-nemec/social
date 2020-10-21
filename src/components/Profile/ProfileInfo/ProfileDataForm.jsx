import React from 'react'
import s from './ProfileInfo.module.css'
import { Field, reduxForm } from 'redux-form'
import { Input, TextArea } from '../../Common/FormControls/FormControls'

const ProfileDataForm = ({
    contacts,
    uploadProfilePhoto,
    isOwner,
    handleSubmit,
    error
}) => {
    const onFileSelected = e => {
        if (e.target.files.length) {
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

export const ProfileDataReduxForm = reduxForm({
    form: 'edit-profile'
})(ProfileDataForm)