import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../../redux/auth-reducer'
import { RootStateType } from '../../redux/redux-store'
import Header, { DispatchPropsType, MapPropsType } from './Header'

class HeaderContainerAPI extends Component<MapPropsType & DispatchPropsType> {
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

const mapStateToProps = ({ authReducer: { login, isAuth } }: RootStateType): MapPropsType => ({
    login: login,
    isAuth: isAuth
})

export default connect<MapPropsType, DispatchPropsType, {}, RootStateType>(
    mapStateToProps,
    { logout }
)(HeaderContainerAPI)