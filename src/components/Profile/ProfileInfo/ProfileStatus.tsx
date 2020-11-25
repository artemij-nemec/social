import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateStatus } from '../../../redux/profile-reducer'
import { RootStateType } from '../../../redux/redux-store'

const ProfileStatus: React.FC<{isOwner: boolean}> = ({ isOwner }) => {
    const stateStatus = useSelector((state: RootStateType) => state.profileReducer.status)
    const dispatch = useDispatch()
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState<string>(stateStatus)

    useEffect(
        () => setStatus(stateStatus),
        [stateStatus]
    )

    const activateEditMode = () => {
        if (isOwner) {
            setEditMode(true)
        }
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateStatus(status))
    }
    const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value)
    }

    return (
        <div><b>Status: </b>
            {!editMode &&
                <span
                    onDoubleClick={activateEditMode}
                >{stateStatus}</span>
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