import { Button, Form, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { profileActions } from '../../../redux/profile-reducer'
import { RootStateType } from '../../../redux/redux-store'
import s from './MyPosts.module.css'
import Post from './Post/Post'

//posts redux form
type FormPropsType = {
    newPostText: string
}

const MyPostsForm: React.FC = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const onFinish = (values: FormPropsType) => {
        dispatch(profileActions.addPost(values.newPostText))
        form.resetFields()
    }
    return <Form
        form={form}
        name="my-posts"
        onFinish={onFinish}
    >
        <Form.Item
            name="newPostText"
            className={s.newPostItem}
            rules={[
                { required: true, message: 'Please input your message!' }
            ]}
        >
            <Input.TextArea rows={4} placeholder="New post..." />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" className={s.newPostButton}>
                Add post
            </Button>
        </Form.Item>
    </Form>
}

//MyPosts
const MyPosts = React.memo(() => {
    const posts = useSelector((state: RootStateType) => state.profileReducer.posts)
    const postsList = posts.map(post => <Post message={post.message} key={post.id} />)

    return <div className={s.myPostsContainer}>
            <h2 className={s.header}>My Posts</h2>
            <div className={s.posts}>
                {postsList}
            </div>
            <MyPostsForm />
        </div>
})

export default MyPosts