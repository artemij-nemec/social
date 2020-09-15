import React from 'react'
import s from './Users.module.css'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'

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
            <User
                key={user.id}
                id={user.id}
                photos={user.photos}
                name={user.name}
                status={user.status}
                followed={user.followed}
                followingInProgress={user.followingInProgress}
                isAuth={props.isAuth}
                followUser={props.followUser}
                unfollowUser={props.unfollowUser}
            />
        )}
    </div>
}

export default Users;