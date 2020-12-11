import { Button, Checkbox, Form, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/auth-reducer'
import { getCaptchaUrl, getIsAuth } from '../../redux/auth-selectors'
import { maxLengthRuleCreator } from '../../utils/validators/validators'
import s from './Login.module.css'

//Login redux form
type LoginFormDataType = {
    email:          string
    password:       string
    rememberMe:     boolean
    captcha:        string
}

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
}
const tailLayout = {
    wrapperCol: { offset: 4, span: 16,  },
}
const LoginForm: React.FC = () => {
    const captchaUrl = useSelector(getCaptchaUrl)
    const dispatch = useDispatch()
    const [form] = Form.useForm()

    const onFinish = (values: LoginFormDataType) => {
        dispatch(login(
            values.email,
            values.password,
            values.rememberMe,
            values.captcha
        ))
    }

    return <Form
        {...layout}
        form={form}
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className={s.loginForm}
    >
        <Form.Item
            label="Login"
            name="email"
            rules={[
                { required: true, message: 'Please input your Login!' },
                maxLengthRuleCreator(50)
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Password"
            name="password"
            rules={[
                { required: true, message: 'Please input your password!' },
                maxLengthRuleCreator(30)
            ]}
        >
            <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
        </Form.Item>
        {captchaUrl &&
            <>
                <Form.Item {...tailLayout}>
                    <div className={s.imgContainer}>
                        <img src={captchaUrl} alt="" />
                    </div>
                </Form.Item>
                <Form.Item
                    label="Captcha"
                    name="captcha"
                    rules={[{ required: true, message: 'Please input captcha!' }]}
                >
                    <Input />
                </Form.Item>
            </>
        }
        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
                Login
            </Button>
        </Form.Item>
    </Form>
}

///Login
export const Login: React.FC = () => {
    const isAuth = useSelector(getIsAuth)
    if (isAuth) {
        return <Redirect to='/profile' />
    }

    return (<>
        <h1>Login</h1>
        <LoginForm />
    </>)
}
