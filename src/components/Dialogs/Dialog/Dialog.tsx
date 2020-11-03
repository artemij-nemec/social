import React from 'react'
import s from './Dialog.module.css'
import { NavLink } from 'react-router-dom'
import { DialogType } from '../../../types/types'


const Dialog: React.FC<DialogType> = ({ id, name }) => {
    return <div className={s.dialog}>
        <NavLink to={"/dialogs/" + id} activeClassName={s.active}>{name}</NavLink>
    </div>
}

export default Dialog
