import React from 'react'
import { MessageType } from '../../../types/types'
import s from './Message.module.css'

const Message: React.FC<MessageType> = ({ id, text }) => {
    return <div className={s.message}>
        { text }
    </div>
}

export default Message
