import React, { Component } from 'react'
import Profile from './Profile';
import { connect } from 'react-redux';
import { setUser, updateStatus, uploadProfilePhoto, saveProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainerAPI extends Component {
    updateProfile() {
        let { match, authorizedUserId, history, setUser } = this.props
        let userId = match.params.userId
        if (!userId) {
            userId = authorizedUserId
            if (!userId) {
                history.push("/login")
            }
        }
        if (userId) {
            setUser(userId)
        }
    }
    componentDidMount() {
        this.updateProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.userId !== prevProps.match.params.userId) {
            this.updateProfile()
        }
    }

    render() {
        return <Profile {...this.props} isOwner={!this.props.match.params.userId} />
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
    connect(
        mapStateToProps,
        { setUser, updateStatus, uploadProfilePhoto, saveProfile }
    )
)(ProfileContainerAPI)
