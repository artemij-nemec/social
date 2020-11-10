import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { actions } from '../../redux/dialogs-reducer';
import { RootStateType } from '../../redux/redux-store';
import { DialogType, MessageType } from '../../types/types';
import Dialogs from './Dialogs';

type MapStateToPropsType = {
    dialogs:        Array<DialogType>
    messages:       Array<MessageType>
    newMessageText: string
}
type MapDispatchToPropsType = {
    addMessage: (text: string) => void
}
type DialogContainerPropsType = MapStateToPropsType & MapDispatchToPropsType
const mapStateToProps = ({ dialogsReducer }: RootStateType): MapStateToPropsType => {
    return {
        dialogs: dialogsReducer.dialogs,
        messages: dialogsReducer.messages,
        newMessageText: dialogsReducer.newMessageText
    }
}
const mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    return {
        addMessage: text => dispatch(actions.sendMessageActionCreator(text))
    }
}

export default compose(
    withAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootStateType>(
        mapStateToProps, mapDispatchToProps
    )
)(Dialogs)
