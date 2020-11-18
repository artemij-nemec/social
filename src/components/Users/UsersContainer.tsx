import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RootStateType } from '../../redux/redux-store'
import { followUser, getUsersList, unfollowUser, UsersFilterType } from '../../redux/users-reducer'
import { getCurrentPage, getFilters, getIsFetching, getPageSize, getTotalUsersCount, getUsersSelector } from '../../redux/users-selectors'
import { UserType } from '../../types/types'
import Preloader from '../Common/Preloader/Preloader'
import Users from './Users'

type MapStatePropsType = {
    pageSize:           number
    currentPage:        number
    totalUsersCount:    number
    isAuth:             boolean
    isFetching:         boolean
    users:              Array<UserType>
    filter:             UsersFilterType
}
type MapDispatchPropsType = {
    getUsersList:       (page: number, pageSize: number, filter: UsersFilterType) => void
    unfollowUser:       (id: number) => void
    followUser:         (id: number) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType
class UsersAPIComponent extends Component<PropsType> {
    componentDidMount() {
        const { currentPage, pageSize, getUsersList , filter} = this.props
        getUsersList(currentPage, pageSize, filter)
    }
    onPageChanged = (page: number) => {
        const { currentPage, pageSize, getUsersList, filter } = this.props
        if (page !== currentPage) {
            getUsersList(page, pageSize, filter)
        }
    }
    onFilterChanged = (filter: UsersFilterType) => {
        const { pageSize, getUsersList } = this.props
        getUsersList(1, pageSize, filter)
    }

    render() {
        const {
            isFetching,
            unfollowUser,
            followUser,
            totalUsersCount,
            pageSize,
            currentPage,
            users,
            isAuth
        } = this.props
        return <>
            { isFetching ? <Preloader /> : null }
            <Users
                onPageChanged={this.onPageChanged}
                onFilterChanged={this.onFilterChanged}
                unfollowUser={unfollowUser}
                followUser={followUser}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                users={users}
                isAuth={isAuth}
                searchFilter={this.props.filter}
            />
        </>
    }
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isAuth: state.authReducer.isAuth,
        filter: getFilters(state)
    }
}

const UsersContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(
    mapStateToProps,
    {
        followUser,
        unfollowUser,
        getUsersList
    })
    (UsersAPIComponent)
export default UsersContainer
