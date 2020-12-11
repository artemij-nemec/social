import { UploadOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Upload } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadProfilePhoto } from '../../../redux/profile-reducer'
import { RootStateType } from '../../../redux/redux-store'
import { ContactsType, ProfileType } from '../../../types/types'
import s from './ProfileInfo.module.css'

type OwnPropsType = {
    contacts:       ContactsType
    isOwner:        boolean
    initialValues:  ProfileType
    onSubmit:       (profileData: ProfileType) => void
}
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 }
}

export const ProfileDataForm: React.FC<OwnPropsType> = ({
    contacts,
    isOwner,
    initialValues,
    onSubmit
}) => {
    const dispatch = useDispatch()
    const isUpdating = useSelector((state: RootStateType) => state.profileReducer.isUpdating)
    const beforeUpload = (file: File) => {
        return false
      }
    const onChange = (info: any) => {
        if (info.file.status !== 'uploading') {
          dispatch(uploadProfilePhoto(info.file))
        }
      }

    return <Form
        {...layout}
        name="profile-form"
        initialValues={initialValues}
        onFinish={onSubmit}
    >
        <div className={s.uploadButtonContainer}>
            <Upload
                name="file"
                beforeUpload={beforeUpload}
                onChange={onChange}
                showUploadList={false}
            >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </div>
        {isOwner && <div className={s.editButtonContainer}>
            <Button
                type="primary"
                htmlType="submit"
                disabled={isUpdating}
            >Save changes</Button>
        </div>}
        <Form.Item
            label="Full name"
            name="fullName"
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="About me"
            name="aboutMe"
        >
            <Input />
        </Form.Item>
        <Form.Item
            {...tailLayout}
            name="lookingForAJob"
            valuePropName="checked"
        >
            <Checkbox defaultChecked={false}>Looking for a job</Checkbox>
        </Form.Item>
        <Form.Item
            label="Description"
            name="lookingForAJobDescription"
            className={s.description}
        >
            <Input.TextArea rows={4} />
        </Form.Item>
        <b>Contacts</b>
        {Object.keys(contacts).map(contactKey => <div
                key={contactKey}
                className={s.paddingLeft10px}>
                <Form.Item
                    label={contactKey}
                    name={["contacts", contactKey]}
                >
                    <Input />
                </Form.Item>
            </div>
        )}
    </Form>
}
