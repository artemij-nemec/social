import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { setUser } from '../../redux/profile-reducer';
import { RootStateType } from '../../redux/redux-store';
import Profile from './Profile';

const ProfileContainer: React.FC = () =>  {
    const authorizedUserId = useSelector((state: RootStateType) => state.authReducer.userId)
    type ParamsType = {
        userId: string
    }
    const params = useParams<ParamsType>()
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(
        () => {
            let userId = Number(params.userId) as number | null
            if (!userId) {
                userId = authorizedUserId
                if (!userId) {
                    history.push("/login")
                }
            }
            if (userId) {
                dispatch(setUser(userId))
            }
        },
        [ params.userId ]
    )

    return <Profile isOwner={!params.userId} />
}

export default ProfileContainer
