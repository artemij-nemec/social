import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { saveProfile, setUser, updateStatus, uploadProfilePhoto } from '../../redux/profile-reducer';
import { RootStateType } from '../../redux/redux-store';
import { ProfileType, SaveProfileType, SetUserType, UpdateStatusType, UploadProfilePhotoType } from '../../types/types';
import Profile from './Profile';

interface PropsType extends RouteComponentProps<any> {
    authorizedUserId:   number
    setUser:            SetUserType
  }
class ProfileContainerAPI extends Component<PropsType & MapStateToPropsType & MapDispatchToPropsType> {
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

    componentDidUpdate(prevProps: PropsType) {
        if(this.props.match.params.userId !== prevProps.match.params.userId) {
            this.updateProfile()
        }
    }

    render() {
        return <Profile {...this.props} isOwner={!this.props.match.params.userId} />
    }
}

type MapStateToPropsType = {
    profile:            ProfileType | null
    status:             string
    authorizedUserId:   number | null
    isAuth:             boolean
}
let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return {
        profile: state.profileReducer.profile,
        status: state.profileReducer.status,
        authorizedUserId: state.authReducer.userId,
        isAuth: state.authReducer.isAuth
    }
}
type MapDispatchToPropsType = {
    setUser:            SetUserType
    updateStatus:       UpdateStatusType
    uploadProfilePhoto: UploadProfilePhotoType
    saveProfile:        SaveProfileType
}
export default compose<any>(
    withRouter,
    // withAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>(
        mapStateToProps,
        { setUser, updateStatus, uploadProfilePhoto, saveProfile }
    )
)(ProfileContainerAPI)
