import { Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import defaultAvatar from '../../assets/images/default_mini_avatar.jpg'
import { maxLengthRuleCreator } from '../../utils/validators/validators'
import s from './ChatPage.module.css'

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const ChatPage: React.FC = () => {
    return <div>
        <Messages />
        <AddMessageForm />
    </div>
}

export default ChatPage

type Message = {
    userId:     number
    userName:   string
    message:    string
    photo:      string
}
const Messages: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([])
    useEffect(() => {
        ws.addEventListener('message', e => {
            const newMessages = JSON.parse(e.data)
            setMessages(prevState => [...prevState, ...newMessages])
        })
    }, [])
    return <div className={s.messagesContainer}>
       {messages.map((message, index) => <Message key={index} message={message} />)}
    </div>
}

const Message: React.FC<{message: Message}> = ({ message }) => {
    return <div className={s.messageContainer}>
        <img
            className={s.avatar}
            src={message.photo ? message.photo : defaultAvatar}
            alt={message.userName} />
       {message.userName}
       <br/>
       {message.message}
    </div>
}

type FormPropsType = {
    newMessageText: string
}

const AddMessageForm: React.FC = () => {
    const [form] = Form.useForm()
    const onFinish = (values: FormPropsType) => {
        ws.send(values.newMessageText)
        form.resetFields()
    }
    return <Form
        form={form}
        name="chat"
        onFinish={onFinish}
    >
        <Form.Item
            name="newMessageText"
            rules={[
                { required: true, message: 'Please input your message!' },
                maxLengthRuleCreator(250)
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
