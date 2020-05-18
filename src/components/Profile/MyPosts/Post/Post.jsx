import React from 'react'
import s from './Post.module.css'

function Post(props) {
    return <div className={s.item}>
        {props.message}
    </div>
}

export default Post