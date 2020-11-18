import React from 'react'
import { UsersFilterType } from '../../redux/users-reducer'
import { followUser, unfollowUser, UserType } from '../../types/types'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'
import s from './Users.module.css'
import { UserSearchForm } from './UserSearchForm'

type UsersPropsType = {
    totalUsersCount:    number
    pageSize:           number
    portionSize?:       number
    currentPage:        number
    isAuth:             boolean
    users:              Array<UserType>
    searchFilter:       UsersFilterType
    onPageChanged:      (page: number) => void
    onFilterChanged:    (filter: UsersFilterType) => void
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
        <UserSearchForm
            onFilterChanged={props.onFilterChanged}
            searchFilter={props.searchFilter}
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