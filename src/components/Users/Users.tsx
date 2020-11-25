import * as queryString from 'querystring'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
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
            dispatch(getUsersList(page, pageSize, actualFilter))
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
        [filter, currentPage]
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