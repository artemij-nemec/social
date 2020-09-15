import React from 'react'
import s from './Header.module.css'
import { NavLink } from 'react-router-dom'

function Header({ login, logout, isAuth }) {
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