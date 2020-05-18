import React from 'react'
import defaultAvatar from '../../assets/images/default_mini_avatar.jpg'
import s from './Users.module.css'
import { NavLink } from 'react-router-dom'
import Paginator from '../Common/Paginator/Paginator'

const Users = (props) => {
    return <div>
        <h2 className={s.header}>Users</h2>
        <Paginator
            totalItemsCount={props.totalUsersCount}
            pageSize={props.pageSize}
            currentPage={props.currentPage}
            onPageChanged={props.onPageChanged}
            portionSize={10}
        />
        {props.users.map(user =>
            <div key={user.id} className={s.userContainer}>
                <span>
                    <div>
                        <NavLink to={'profile/' + user.id}>
                            <img
                                className={s.avatar}
                                src={user.photos.small !== null ? user.photos.small : defaultAvatar}
                                alt={user.name} />
                        </NavLink>
                    </div>
                    <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <div>
                        {user.followed ?
                            <button
                                onClick={() => {
                                    props.unfollowUser(user.id)
                                }}
                                disabled={user.followingInProgress || !props.isAuth}
                            >
                                Unfollow
                            </button>
                            :
                            <button
                                onClick={() => {
                                    props.followUser(user.id)
                                }}
                                disabled={user.followingInProgress || !props.isAuth}
                            >
                                Follow
                            </button>
                        }
                    </div>
                </span>
            </div>
        )}
    </div>
}

export default Users;