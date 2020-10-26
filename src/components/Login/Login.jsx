import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'
import { login, logout } from '../../redux/auth-reducer'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { Input } from '../Common/FormControls/FormControls'
import s from './Login.module.css'

const maxLength = maxLengthCreator(50)
const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
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
            {captchaUrl &&
                <>
                    <img src={captchaUrl} alt="" />
                    <Field
                        name="captcha"
                        component={Input}
                        validate={[required]}
                        type="text"
                        placeholder="Captcha"
                        className={s.loginFormInput}
                    />
                </>
            }
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
    const submit = ({ login, password, rememberMe, captcha }) => {
        props.login(login, password, rememberMe, captcha)
    }
    if (props.isAuth) {
        return <Redirect to='/profile' />
    }

    return (<>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={submit} captchaUrl={props.captchaUrl} />
    </>)
}
const mapStateToProps = state => ({
    isAuth: state.authReducer.isAuth,
    captchaUrl: state.authReducer.captchaUrl
})

export default connect(mapStateToProps, { login, logout })(Login)