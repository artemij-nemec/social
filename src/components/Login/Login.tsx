import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { login } from '../../redux/auth-reducer'
import { getCaptchaUrl, getIsAuth } from '../../redux/auth-selectors'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { Input } from '../Common/FormControls/FormControls'
import s from './Login.module.css'

//Login redux form
type LoginFormDataType = {
    email:          string
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
                    name="email"
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
export const Login: React.FC = () => {
    const isAuth = useSelector(getIsAuth)
    const captchaUrl = useSelector(getCaptchaUrl)
    const dispatch = useDispatch()

    const submit = (formData: LoginFormType) => {
        dispatch(login(
            formData.email,
            formData.password,
            formData.rememberMe,
            formData.captcha
        ))
    }
    if (isAuth) {
        return <Redirect to='/profile' />
    }

    return (<>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={submit} captchaUrl={captchaUrl} />
    </>)
}
