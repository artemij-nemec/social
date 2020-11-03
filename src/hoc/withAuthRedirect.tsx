import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { RootStateType } from '../redux/redux-store'

type PropsType = {
    isAuth: boolean
}

const withAuthRedirect = (Component: React.ComponentType<PropsType>) => {
    let mapStateToProps = (state: RootStateType): PropsType => ({
        isAuth: state.authReducer.isAuth
    })
    class RedirectComponent extends React.Component<PropsType> {
        render() {
            if (!this.props.isAuth) return <Redirect to='/login' />
            return <Component {...this.props} />
        }
    }
    let ConnectedRedirectComponent = connect<PropsType, {}, {}, RootStateType>(
        mapStateToProps
    )(RedirectComponent)

    return ConnectedRedirectComponent
}

export default withAuthRedirect