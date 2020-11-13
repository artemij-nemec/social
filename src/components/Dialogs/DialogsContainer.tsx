import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { actions } from '../../redux/dialogs-reducer';
import { RootStateType } from '../../redux/redux-store';
import Dialogs from './Dialogs';

const mapStateToProps = ({ dialogsReducer }: RootStateType) => {
    return {
        dialogs: dialogsReducer.dialogs,
        messages: dialogsReducer.messages,
        newMessageText: dialogsReducer.newMessageText
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(
        mapStateToProps,
        {
            addMessage: actions.sendMessage
        }
    )
)(Dialogs)
