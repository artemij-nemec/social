import React from 'react'
import s from './Post.module.css'

function Post({ message }) {
    return <div className={s.item}>
        {message}
    </div>
}

export default Post