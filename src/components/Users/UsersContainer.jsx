import React, { Component } from 'react'
import { connect } from 'react-redux'
import Users from './Users'
import { followUser, unfollowUser, getUsersList } from '../../redux/users-reducer'
import Preloader from '../Common/Preloader/Preloader'
import { getUsersSelector, getTotalUsersCount, getPageSize, getCurrentPage, getIsFetching } from '../../redux/users-selectors'

class UsersAPIComponent extends Component {
    componentDidMount() {
        this.props.getUsersList(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (page) => {
        if (page !== this.props.currentPage) {
            this.props.getUsersList(page, this.props.pageSize)
        }
    }

    render() {
        return <>
            { this.props.isFetching ? <Preloader /> : null }
            <Users
                onPageChanged={this.onPageChanged}
                unfollowUser={this.props.unfollowUser}
                followUser={this.props.followUser}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
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
