import { sendMessageActionCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const mapStateToProps = ({ dialogsReducer }) => {
    return {
        dialogs: dialogsReducer.dialogs,
        messages: dialogsReducer.messages,
        newMessageText: dialogsReducer.newMessageText
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
