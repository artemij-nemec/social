import React, { Component } from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { setUserData, logout } from '../../redux/auth-reducer'

class HeaderContainerAPI extends Component {
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

const mapStateToProps = ({ authReducer: { login, isAuth } }) => ({
    login: login,
    isAuth: isAuth
})

export default connect(mapStateToProps, {
    setUserData,
    logout
})(HeaderContainerAPI)