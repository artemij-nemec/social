import { sendMessageActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => {
    return {
        dialogs: state.dialogsReducer.dialogs,
        messages: state.dialogsReducer.messages,
        newMessageText: state.dialogsReducer.newMessageText
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: text => dispatch(sendMessageActionCreator(text))
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, mapDispatchToProps)
)(Dialogs)
