import { connect } from 'react-redux'
import { actions } from '../../../redux/profile-reducer'
import { RootStateType } from '../../../redux/redux-store'
import MyPosts from './MyPosts'

const mapStateToProps = (state: RootStateType) => ({
    posts: state.profileReducer.posts
})

const MyPostsContainer = connect(
    mapStateToProps,
    { addPost: actions.addPost}
)(MyPosts)

export default MyPostsContainer