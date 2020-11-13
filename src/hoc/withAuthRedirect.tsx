import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { RootStateType } from '../redux/redux-store'

type OwnPropsType = {
    isAuth: boolean
}

const withAuthRedirect = <WCP,>(Component: React.ComponentType<WCP>) => {
    let mapStateToProps = (state: RootStateType): OwnPropsType => ({
        isAuth: state.authReducer.isAuth
    })
    const RedirectComponent: React.FC<OwnPropsType> = props => {
        const { isAuth, ...restProps } = props
        if (!isAuth) return <Redirect to='/login' />
        return <Component {...restProps as WCP} />

    }
    let ConnectedRedirectComponent = connect<OwnPropsType, {}, WCP, RootStateType>(
        mapStateToProps
    )(RedirectComponent)

    return ConnectedRedirectComponent
}

export default withAuthRedirect