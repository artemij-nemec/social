import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateType } from '../../redux/redux-store'
import { followUser, getUsersList, unfollowUser, UsersFilterType } from '../../redux/users-reducer'
import { getCurrentPage, getFilter, getPageSize, getTotalUsersCount, getUsersSelector } from '../../redux/users-selectors'
import Paginator from '../Common/Paginator/Paginator'
import User from './User'
import s from './Users.module.css'
import { UserSearchForm } from './UserSearchForm'

const Users: React.FC = props => {
    const users = useSelector(getUsersSelector)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getFilter)
    const isAuth = useSelector((state: RootStateType) => state.authReducer.isAuth)

    const dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(getUsersList(currentPage, pageSize, filter))
        },
        []
    )

    const onPageChanged = (page: number) => {
        if (page !== currentPage) {
            dispatch(getUsersList(page, pageSize, filter))
        }
    }
    const onFilterChanged = (filter: UsersFilterType) => {
        dispatch(getUsersList(1, pageSize, filter))
    }
    const follow = (id: number) => {
        dispatch(followUser(id))
    }
    const unfollow = (id: number) => {
        dispatch(unfollowUser(id))
    }

    return <div>
        <h2 className={s.header}>Users</h2>
        <Paginator
            totalItemsCount={totalUsersCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            portionSize={10}
        />
        <UserSearchForm
            onFilterChanged={onFilterChanged}
            searchFilter={filter}
        />
        {users.map(user =>
            <User
                key={user.id}
                id={user.id}
                photos={user.photos}
                name={user.name}
                status={user.status}
                followed={user.followed}
                followingInProgress={user.followingInProgress}
                isAuth={isAuth}
                followUser={follow}
                unfollowUser={unfollow}
            />
        )}
    </div>
}

export default Users