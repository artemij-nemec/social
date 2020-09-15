import React from 'react'
import s from './Message.module.css'

function Message({ text }) {
    return <div className={s.message}>
        { text }
    </div>
}

export default Message
