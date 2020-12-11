import { Button } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import defaultAvatar from '../../assets/images/default_mini_avatar.jpg'
import { followUser, unfollowUser, UserType } from '../../types/types'
import s from './User.module.css'

type PropsType = UserType & {
    isAuth:                 boolean
    followUser:             followUser
    unfollowUser:           unfollowUser
}
const User: React.FC<PropsType> = ({
    id,
    name,
    status,
    followed,
    followingInProgress,
    photos,
    isAuth,
    followUser,
    unfollowUser
}) => {
    return <div className={s.userContainer}>
        <span>
            <div>
                <NavLink to={'profile/' + id}>
                    <img
                        className={s.avatar}
                        src={photos.small !== null ? photos.small : defaultAvatar}
                        alt={name} />
                </NavLink>
            </div>
            <span>
                <div>{name}</div>
                <div>{status}</div>
            </span>
            <div>
                {followed ?
                    <Button
                        type="default"
                        onClick={() => {
                            unfollowUser(id)
                        }}
                        disabled={followingInProgress || !isAuth}
                    >
                        Unfollow
                    </Button>
                    :
                    <Button
                        type="default"
                        onClick={() => {
                            followUser(id)
                        }}
                        disabled={followingInProgress || !isAuth}
                    >
                        Follow
                    </Button>
                }
            </div>
        </span>
    </div>
}

export default User