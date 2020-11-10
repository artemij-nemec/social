import { connect } from 'react-redux'
import { actions } from '../../../redux/profile-reducer'
import { RootStateType } from '../../../redux/redux-store'
import { PostType } from '../../../types/types'
import MyPosts from './MyPosts'

type MapStateToPropsType = {
    posts: Array<PostType>
}
type MapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}
const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    posts: state.profileReducer.posts
})
const mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => ({
    addPost: newPostText => dispatch(actions.addPostActionCreator(newPostText))
})
const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>(
    mapStateToProps,
    mapDispatchToProps
)(MyPosts)

export default MyPostsContainer