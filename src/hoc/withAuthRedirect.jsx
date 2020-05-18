import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const withAuthRedirect = (Component) => {
    let mapStateToProps = state => ({
        isAuth: state.authReducer.isAuth
    })
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to='/login' />
            return <Component {...this.props} />
        }
    }
    let ConnectedRedirectComponent = connect(mapStateToProps)(RedirectComponent)

    return ConnectedRedirectComponent
}

export default withAuthRedirect