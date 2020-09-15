import React from 'react'
import s from './Dialog.module.css'
import { NavLink } from 'react-router-dom'

function Dialog({ id, name }) {
    return <div className={s.dialog}>
        <NavLink to={"/dialogs/" + id} activeClassName={s.active}>{name}</NavLink>
    </div>
}

export default Dialog
