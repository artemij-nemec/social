import React from 'react'
import { WrappedFieldProps } from 'redux-form'
import s from './FormControls.module.css'

export const TextArea: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched
    return (
        <div className={`${s.formControl} ${hasError ? s.error : ''}`}>
            <textarea {...input} {...props}></textarea>
            { hasError && <div>{meta.error}</div> }
        </div>
    )
}

export const Input: React.FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched
    return <div className={`${s.formControl} ${hasError ? s.error : ''}`}>
        <input {...input} {...props} />
        {hasError && <div>{meta.error}</div>}
    </div>
}
