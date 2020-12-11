import { Pagination } from 'antd'
import * as queryString from 'querystring'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getIsAuth } from '../../redux/auth-selectors'
import { followUser, getUsersList, unfollowUser, usersActions, UsersFilterType } from '../../redux/users-reducer'
import { getCurrentPage, getFilter, getPageSize, getTotalUsersCount, getUsersSelector } from '../../redux/users-selectors'
import User from './User'
import s from './Users.module.css'
import { UserSearchForm } from './UserSearchForm'

const Users: React.FC = () => {
    const users = useSelector(getUsersSelector)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const storedPageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getFilter)
    const isAuth = useSelector(getIsAuth)
    const history = useHistory()

    const dispatch = useDispatch()

    useEffect(
        () => {
            const searchQuery = history.location.search.substr(1)
            const parsedSearch = queryString.parse(searchQuery)
            const page = parsedSearch.page ? Number(parsedSearch.page) : currentPage
            const actualFilter = {
                term: parsedSearch.term ? parsedSearch.term as string : filter.term,
                friends: !parsedSearch.friends ? filter.friends : parsedSearch.friends === 'true' ? true : false
            }
            dispatch(getUsersList(page, storedPageSize, actualFilter))
        },
        []
    )
    useEffect(
        () => {
            let search = { page: currentPage } as {
                page:       number
                term?:      string
                friends?:   boolean
            }
            if (!!filter.term) {
                search.term = filter.term
            }
            if (typeof filter.friends !== 'undefined') {
                search.friends = filter.friends
            }
            history.push({
                pathname: '/users',
                search: queryString.stringify(search)
            })
        },
        [ filter ]
    )

    const onPageChanged = (page: number, pageSize?: number | undefined) => {
        if (page !== currentPage) {
            dispatch(getUsersList(page, pageSize ? pageSize : storedPageSize, filter))
        }
    }
    const onShowSizeChange = (current: number, size: number) => {
        if (size !== storedPageSize) {
            dispatch(usersActions.setPageSize(size))
            dispatch(getUsersList(current, size, filter))
        }
    }
    const onFilterChanged = (filter: UsersFilterType) => {
        dispatch(getUsersList(1, storedPageSize, filter))
    }
    const follow = (id: number) => {
        dispatch(followUser(id))
    }
    const unfollow = (id: number) => {
        dispatch(unfollowUser(id))
    }

    return <div>
        <h2 className={s.header}>Users</h2>
        <UserSearchForm
            onFilterChanged={onFilterChanged}
        />
        <Pagination
            current={currentPage}
            total={totalUsersCount}
            hideOnSinglePage={true}
            onChange={onPageChanged}
            onShowSizeChange={onShowSizeChange}
        />
        <div className={s.usersContainer}>
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
    </div>
}

export default Users