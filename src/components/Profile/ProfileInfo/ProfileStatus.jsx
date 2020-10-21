import React, { useState, useEffect } from 'react'

const ProfileStatus = props => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

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
    const onStatusChange = event => {
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