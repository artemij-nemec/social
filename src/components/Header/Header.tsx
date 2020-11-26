import { Button, Layout } from 'antd'
import Avatar from 'antd/lib/avatar/avatar'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/auth-reducer'
import { getIsAuth, getLogin } from '../../redux/auth-selectors'
import s from './Header.module.css'

const { Header: LayoutHeader } = Layout

const Header: React.FC = () => {
    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getLogin)
    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logout())
    }
    return <LayoutHeader className="header">
        <div className={s.login_block}>
            {isAuth ?
                <div>
                    <Avatar>
                        {login?.substr(0,1).toUpperCase()}
                    </Avatar> {login} <Button onClick={onLogout}>Logout</Button>
                </div>
                :
                <Link to={'/login'}>
                    <Button>Login</Button>
                </Link>
            }
        </div>
    </LayoutHeader>
}

export default Header