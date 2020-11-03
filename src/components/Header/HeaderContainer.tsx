import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../redux/auth-reducer'
import { RootStateType } from '../../redux/redux-store'
import Header from './Header'

type MapStatePropsType = {
    login:  string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    logout: () => void
}
type OwnPropsType = {}
class HeaderContainerAPI extends Component<MapStatePropsType & MapDispatchPropsType & OwnPropsType> {
    render() {
        const { login, logout, isAuth } = this.props
        return (
            <Header
                login={login}
                logout={logout}
                isAuth={isAuth}
            />
        )
    }
}

const mapStateToProps = ({ authReducer: { login, isAuth } }: RootStateType): MapStatePropsType => ({
    login: login,
    isAuth: isAuth
})

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, RootStateType>(
    mapStateToProps,
    { logout }
)(HeaderContainerAPI)