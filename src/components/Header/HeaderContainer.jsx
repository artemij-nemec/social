import React, { Component } from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { setUserData, logout } from '../../redux/auth-reducer'

class HeaderContainerAPI extends Component {
    render() {
        return (
            <Header
                login={this.props.login}
                logout={this.props.logout}
                isAuth={this.props.isAuth}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    login: state.authReducer.login,
    isAuth: state.authReducer.isAuth
})

export default connect(mapStateToProps, {
    setUserData,
    logout
})(HeaderContainerAPI)