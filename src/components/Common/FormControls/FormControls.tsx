import React from 'react'
import s from './FormControls.module.css'

type PropsType = {
    input: Array<string>
    meta: {
        error:      string
        touched:    boolean
    }
}
export const TextArea: React.FC<PropsType> = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched
    return (
        <div className={`${s.formControl} ${hasError ? s.error : ''}`}>
            <textarea {...input} {...props}></textarea>
            { hasError && <div>{meta.error}</div> }
        </div>
    )
}

export const Input: React.FC<PropsType> = ({input, meta, ...props}) => {
    const hasError = meta.error && meta.touched
    return (
        <div className={`${s.formControl} ${hasError ? s.error : ''}`}>
            <input {...input} {...props} />
            { hasError && <div>{meta.error}</div> }
        </div>
    )
}
