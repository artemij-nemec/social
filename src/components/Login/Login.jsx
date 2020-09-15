import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { required, maxLengthCreator } from '../../utils/validators/validators'
import { Input } from '../Common/FormControls/FormControls'
import { connect } from 'react-redux'
import { login, logout } from '../../redux/auth-reducer'
import { Redirect } from 'react-router-dom'
import s from './Login.module.css'

const maxLength = maxLengthCreator(50)
const LoginForm = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit} className={s.loginForm}>
            <div>
                <Field
                    name="login"
                    component={Input}
                    validate={[required, maxLength]}
                    type="text"
                    placeholder="Login"
                    className={s.loginFormInput}
                />
            </div>
            <div>
                <Field
                    name="password"
                    component={Input}
                    validate={[required, maxLength]}
                    type="password"
                    placeholder="Password"
                    className={s.loginFormInput}
                />
            </div>
            <div>
                <Field
                    name="rememberMe"
                    component="input"
                    type="checkbox"
                />
                <label htmlFor="rememberMe">Remember me</label>
            </div>
            {error &&
                <div className={s.formError}>
                    {error}
                </div>
            }
            <div>
                <button type="submit" className={s.loginButton}>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const Login = (props) => {
    const submit = ({ login, password, rememberMe }) => {
        props.login(login, password, rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to='/profile' />
    }

    return (<>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={submit} />
    </>)
}
const mapStateToProps = state => ({
    isAuth: state.authReducer.isAuth
})

export default connect(mapStateToProps, { login, logout })(Login)