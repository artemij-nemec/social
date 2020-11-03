import React, { useState, useEffect, ChangeEvent } from 'react'
import { UpdateStatusType } from '../../../types/types'

type PropsType = {
    status:         string
    updateStatus:   UpdateStatusType
}

const ProfileStatus: React.FC<PropsType> = props => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState<string>(props.status)

    useEffect(
        () => setStatus(props.status),
        [props.status]
    )

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value)
    }

    return (
        <div><b>Status: </b>
            {!editMode &&
                <span
                    onDoubleClick={activateEditMode}
                >{props.status}</span>
            }
            {editMode &&
                <input
                    onChange={onStatusChange}
                    onBlur={deactivateEditMode}
                    value={status}
                    autoFocus={true}
                />
            }
        </div>
    )
}

export default ProfileStatus