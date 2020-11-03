import React from 'react'
import { PostType } from '../../../../types/types'
import s from './Post.module.css'

const Post: React.FC<PostType> = ({ message }) => {
    return <div className={s.item}>
        {message}
    </div>
}

export default Post