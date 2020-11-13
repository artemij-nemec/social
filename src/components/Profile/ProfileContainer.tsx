import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { saveProfile, setUser, updateStatus, uploadProfilePhoto } from '../../redux/profile-reducer';
import { RootStateType } from '../../redux/redux-store';
import { SaveProfileType, SetUserType, UpdateStatusType, UploadProfilePhotoType } from '../../types/types';
import Profile from './Profile';

type PathParamsType = {
    userId: string
}
interface PropsType extends RouteComponentProps<PathParamsType> {
    authorizedUserId:   number
    setUser:            SetUserType
}
type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    setUser:            SetUserType
    updateStatus:       UpdateStatusType
    uploadProfilePhoto: UploadProfilePhotoType
    saveProfile:        SaveProfileType
}
class ProfileContainerAPI extends Component<PropsType & MapStateToPropsType & MapDispatchToPropsType> {
    updateProfile() {
        let { match, authorizedUserId, history, setUser } = this.props
        let userId = Number(match.params.userId)
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

    componentDidUpdate(prevProps: PropsType) {
        if(this.props.match.params.userId !== prevProps.match.params.userId) {
            this.updateProfile()
        }
    }

    render() {
        return <Profile {...this.props} isOwner={!this.props.match.params.userId} />
    }
}

let mapStateToProps = (state: RootStateType) => {
    return {
        profile: state.profileReducer.profile,
        status: state.profileReducer.status,
        authorizedUserId: state.authReducer.userId,
        isAuth: state.authReducer.isAuth
    }
}
export default compose<React.ComponentType>(
    withRouter,
    // withAuthRedirect,
    connect(
        mapStateToProps,
        { setUser, updateStatus, uploadProfilePhoto, saveProfile }
    )
)(ProfileContainerAPI)
