import { Col, Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootStateType } from '../../redux/redux-store'
import Preloader from '../Common/Preloader/Preloader'
import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo'

const Profile: React.FC<{isOwner: boolean}> = ({ isOwner }) => {
    const profile = useSelector((state: RootStateType) => state.profileReducer.profile)

    return (profile ?
        <Row>
            <Col span={12}>
                <ProfileInfo
                    profile={profile}
                    isOwner={isOwner}
                />
            </Col>
            <Col span={12}>
                <MyPosts />
            </Col>
        </Row>
        :
        <Preloader />
    )
}

export default Profile