import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { login, logout } from '../../redux/auth-reducer'
import { RootStateType } from '../../redux/redux-store'
import { LoginType, LogoutType } from '../../types/types'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { Input } from '../Common/FormControls/FormControls'
import s from './Login.module.css'

//Login redux form
type LoginFormDataType = {
    login:          string
    password:       string
    rememberMe:     boolean
    captcha:        string
}
type LoginFormHandlerType = {
    handleSubmit:   (value: LoginFormDataType) => void
}
type LoginFormType = LoginFormDataType & LoginFormHandlerType
type OwnPropsType = {
    captchaUrl: string | null
}
const maxLength = maxLengthCreator(50)
const LoginForm: React.FC<OwnPropsType &
    InjectedFormProps<LoginFormType, OwnPropsType>
> = props => {
    const { handleSubmit, error, captchaUrl } = props
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

const LoginReduxForm = reduxForm<LoginFormType, OwnPropsType>({
    form: 'login'
})(LoginForm)

///Login
type LoginPropsType = mapStateToPropsType & mapDispatchToPropsType
const Login: React.FC<LoginPropsType> = (props) => {
    const submit = ({ login, password, rememberMe, captcha }: LoginFormType) => {
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

///connected Login
type mapStateToPropsType = {
    isAuth:     boolean
    captchaUrl: string | null
}
type mapDispatchToPropsType = {
    login:  LoginType
    logout: LogoutType
}
type LoginOwnPropsType = {}
const mapStateToProps = (state: RootStateType): mapStateToPropsType => ({
    isAuth: state.authReducer.isAuth,
    captchaUrl: state.authReducer.captchaUrl
})

export default connect<mapStateToPropsType, mapDispatchToPropsType, LoginOwnPropsType, RootStateType>(
    mapStateToProps,
    { login, logout }
)(Login)