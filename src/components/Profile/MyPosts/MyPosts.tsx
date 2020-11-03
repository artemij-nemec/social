import React from 'react'
import { Field, InjectedFormProps, reduxForm, reset } from 'redux-form'
import { PostType } from '../../../types/types'
import { maxLengthCreator, required } from '../../../utils/validators/validators'
import { TextArea } from '../../Common/FormControls/FormControls'
import s from './MyPosts.module.css'
import Post from './Post/Post'

//posts redux form
type FormPropsType = {
    newPostText: string
}
type FormHandlerType = {
    handleSubmit:   (value: FormPropsType) => void
}
type FormType = FormPropsType & FormHandlerType
const maxLength = maxLengthCreator(10)
const MyPostsForm: React.FC<InjectedFormProps<FormType>> = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <Field
                        name="newPostText"
                        component={TextArea}
                        validate={[required, maxLength]}
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

const afterSubmit = (result: any, dispatch: any) => dispatch(reset('addNewPost'))
const MyPostsReduxForm = reduxForm<FormType>({
    form: 'addNewPost',
    onSubmitSuccess: afterSubmit
})(MyPostsForm)

//MyPosts
type MyPostsPropsType = {
    posts:      Array<PostType>
    addPost:    (newPostText: string) => void
}
const MyPosts = React.memo<MyPostsPropsType>(({ posts, addPost }) => {
    const postsList = posts.map(post => <Post message={post.message} key={post.id} />)
    const submit = ({ newPostText }: FormPropsType) => {
        addPost(newPostText)
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
})

export default MyPosts