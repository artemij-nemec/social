import React, { Component } from 'react'
import Profile from './Profile';
import { connect } from 'react-redux';
import { setUser, updateStatus } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainerAPI extends Component {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        if (userId) {
            this.props.setUser(userId)
        }
    }

    render() {
        return <Profile {...this.props}/>
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profileReducer.profile,
        status: state.profileReducer.status,
        authorizedUserId: state.authReducer.userId,
        isAuth: state.authReducer.isAuth
    }
}

export default compose(
    withRouter,
    // withAuthRedirect,
    connect(mapStateToProps, {setUser, updateStatus})
)(ProfileContainerAPI)
