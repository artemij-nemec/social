import React from 'react'
import defaultAvatar from '../../assets/images/default_mini_avatar.jpg'
import s from './User.module.css'
import { NavLink } from 'react-router-dom'

const User = ({
    id,
    photos,
    name,
    status,
    followed,
    isAuth,
    followingInProgress,
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
                    <button
                        onClick={() => {
                            unfollowUser(id)
                        }}
                        disabled={followingInProgress || !isAuth}
                    >
                        Unfollow
                    </button>
                    :
                    <button
                        onClick={() => {
                            followUser(id)
                        }}
                        disabled={followingInProgress || !isAuth}
                    >
                        Follow
                    </button>
                }
            </div>
        </span>
    </div>
}

export default User