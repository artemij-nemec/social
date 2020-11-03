import React from 'react'
import { followUser, unfollowUser, UserType } from '../../types/types'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'
import s from './Users.module.css'

type UsersPropsType = {
    totalUsersCount:    number
    pageSize:           number
    portionSize?:       number
    currentPage:        number
    isAuth:             boolean
    users:              Array<UserType>
    onPageChanged:      (page: number) => void
    followUser:         followUser
    unfollowUser:       unfollowUser
}
const Users: React.FC<UsersPropsType> = props => {
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

export default Users