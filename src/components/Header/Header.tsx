import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Header.module.css'

type HeaderPropsType = {
    login:  string | null
    isAuth: boolean
    logout: () => void
}
const Header: React.FC<HeaderPropsType> = ({ login, logout, isAuth }) => {
    return <header className={s.header}>
        <div className={s.login_block}>
            {isAuth ?
                <div>{login} <button onClick={logout}>Logout</button></div>
                :
                <NavLink to={'/login'}>Login</NavLink>
            }
        </div>
    </header>
}

export default Header