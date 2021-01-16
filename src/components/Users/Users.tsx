import { Pagination } from 'antd'
import * as queryString from 'querystring'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getIsAuth } from '../../redux/auth-selectors'
import { followUser, getUsersList, unfollowUser, usersActions, UsersFilterType } from '../../redux/users-reducer'
import { getCurrentPage, getPageSize, getTotalUsersCount, getUsersSelector } from '../../redux/users-selectors'
import User from './User'
import s from './Users.module.css'
import { UserSearchForm } from './UserSearchForm'

const Users: React.FC = () => {
    const users = useSelector(getUsersSelector)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const storedPageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const isAuth = useSelector(getIsAuth)
    const history = useHistory()

    const dispatch = useDispatch()
    const setQueryString = (page: number, filter: UsersFilterType) => {
        let search = { page } as {
            page: number
            term?: string
            friends?: boolean
        }
        if (filter?.term) {
            search.term = filter.term
        }
        if (typeof filter?.friends !== 'undefined') {
            search.friends = filter.friends
        }
        history.push({
            pathname: '/users',
            search: queryString.stringify(search)
        })
    }
    const parseQueryString = (query: string) => {
        const searchQuery = query.substr(1)
        const parsedSearch = queryString.parse(searchQuery)
        let filterAndPage = {
            filter: {} as UsersFilterType,
            page: undefined as number | undefined
        }
        if (parsedSearch.term) {
            filterAndPage.filter.term = parsedSearch.term as string
        }
        if (parsedSearch.friends) {
            filterAndPage.filter.friends = parsedSearch.friends === 'true' ? true : false
        }
        if (parsedSearch.page) {
            filterAndPage.page = Number(parsedSearch.page)
        }

        return filterAndPage
    }
    const [initialised, setInitialised] = useState(false)
    //local filter
    const initialFilterAndPage = parseQueryString(history.location.search)
    const [filterAndPage, setFilterAndPage] = useState({
        filter: initialFilterAndPage.filter,
        page: initialFilterAndPage.page ? initialFilterAndPage.page : currentPage
    })
    //set filter and page from query string
    useEffect(
        () => {
        const parsedFilter = parseQueryString(history.location.search)
        setFilterAndPage(prevState => ({
            filter: parsedFilter.filter,
            page: parsedFilter.page ? parsedFilter.page : prevState.page
        }))
        setInitialised(true)
        },
        [history.location.search]
    )
    //get users
    useEffect(
        () => {
            if (initialised) {
                dispatch(getUsersList(
                    filterAndPage.page,
                    storedPageSize,
                    filterAndPage.filter
                ))
            }
        },
        [dispatch, filterAndPage, initialised, storedPageSize]
    )

    const onPageChanged = (page: number, pageSize?: number | undefined) => {
        if (page !== currentPage) {
            setQueryString(page, filterAndPage.filter)
        }
    }
    const onShowSizeChange = (current: number, size: number) => {
        if (size !== storedPageSize) {
            dispatch(usersActions.setPageSize(size))
        }
    }
    const onFilterChanged = (filter: UsersFilterType) => {
        setQueryString(1, filter)
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