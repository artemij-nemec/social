import { Button, Form, Input } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { dialogsActions } from '../../redux/dialogs-reducer'
import { DialogType, MessageType } from '../../types/types'
import { maxLengthRuleCreator } from '../../utils/validators/validators'
import Dialog from './Dialog/Dialog'
import s from './Dialogs.module.css'
import Message from './Message/Message'

type FormPropsType = {
    newMessageText: string
}

const AddMessageForm: React.FC = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const onFinish = (values: FormPropsType) => {
        dispatch(dialogsActions.sendMessage(values.newMessageText))
        form.resetFields()
    }
    return <Form
        form={form}
        name="my-posts"
        onFinish={onFinish}
    >
        <Form.Item
            name="newMessageText"
            rules={[
                { required: true, message: 'Please input your message!' },
                maxLengthRuleCreator(50)
            ]}
        >
            <Input.TextArea rows={4} placeholder="New message..." />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" className={s.addPostButton}>
                Add post
            </Button>
        </Form.Item>
    </Form>
}

type DialogsPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}
const Dialogs: React.FC<DialogsPropsType> = ({ dialogs, messages }) => {
    const dialogsList = dialogs
        .map(dialogItem => <Dialog name={dialogItem.name} key={dialogItem.id} id={dialogItem.id} />)
    const messagesList = messages
        .map(messageItem => <Message text={messageItem.text} key={messageItem.id} id={messageItem.id} />)

    return <div className={s.dialogs}>
        <div className={s.dialogs_items}>
            {dialogsList}
        </div>
        <div>
            <div className={s.messages}>
                {messagesList}
            </div>
            <AddMessageForm />
        </div>
    </div>
}

export default Dialogs
