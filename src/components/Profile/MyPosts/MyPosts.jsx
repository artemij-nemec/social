import React from 'react'
import Post from './Post/Post'
import s from './MyPosts.module.css'
import { reduxForm, Field, reset } from 'redux-form'
import { required, maxLengthCreator } from '../../../utils/validators/validators'
import { TextArea } from '../../Common/FormControls/FormControls'

const maxLength = maxLengthCreator(10)
const MyPostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field
                        name="newPostText"
                        component={TextArea}
                        validate={[ required, maxLength ]}
                        placeholder="New post..."
                    />
                </div>
                <div>
                    <button type="submit">Add post</button>
                </div>
            </div>
        </form>
    )
}

const afterSubmit = (result, dispatch) => dispatch(reset('addNewPost'))
const MyPostsReduxForm = reduxForm({
    form: 'addNewPost',
    onSubmitSuccess: afterSubmit
})(MyPostsForm)

function MyPosts(props) {
    const postsList = props.posts.map(post => <Post message={post.message} key={post.id}/>)
    const submit = values => {
        props.addPost(values.newPostText)
    }
    return (
        <div>
            <h3>My Posts</h3>
            <MyPostsReduxForm onSubmit={submit} />
            <div className={s.posts}>
                {postsList}
            </div>
        </div>
    )
}

export default MyPosts