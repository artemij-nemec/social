import React, { Component } from 'react'
import { connect } from 'react-redux'
import Users from './Users'
import { followUser, unfollowUser, getUsersList } from '../../redux/users-reducer'
import Preloader from '../Common/Preloader/Preloader'
import { getUsersSelector, getTotalUsersCount, getPageSize, getCurrentPage, getIsFetching } from '../../redux/users-selectors'

class UsersAPIComponent extends Component {
    componentDidMount() {
        const { currentPage, pageSize, getUsersList } = this.props
        getUsersList(currentPage, pageSize)
    }

    onPageChanged = page => {
        const { currentPage, pageSize, getUsersList } = this.props
        if (page !== currentPage) {
            getUsersList(page, pageSize)
        }
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
                unfollowUser={unfollowUser}
                followUser={followUser}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                users={users}
                isAuth={isAuth}
            />
        </>
    }
}

const mapStateToProps = state => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isAuth: state.authReducer.isAuth
    }
}

const UsersContainer = connect(mapStateToProps,
    {
        followUser,
        unfollowUser,
        getUsersList
    })
    (UsersAPIComponent)
export default UsersContainer
