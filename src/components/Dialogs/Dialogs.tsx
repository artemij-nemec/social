import React from 'react'
import { Field, InjectedFormProps, reduxForm, reset } from 'redux-form'
import { DialogType, MessageType } from '../../types/types'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { TextArea } from '../Common/FormControls/FormControls'
import Dialog from './Dialog/Dialog'
import s from './Dialogs.module.css'
import Message from './Message/Message'

type FormPropsType = {
    newMessageText: string
}
type AddMessageFormPropsType = {
    handleSubmit: (value: FormPropsType) => void
}
const maxLength = maxLengthCreator(50)
const AddMessageForm: React.FC<InjectedFormProps<FormPropsType & AddMessageFormPropsType>> = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    name="newMessageText"
                    component={TextArea}
                    validate={[required, maxLength]}
                />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}
const afterSubmit = (result: string, dispatch: any) => dispatch(reset('addMessage'))
const AddMessageReduxForm = reduxForm<FormPropsType & AddMessageFormPropsType>({
    form: 'addMessage',
    onSubmitSuccess: afterSubmit
})(AddMessageForm)

type DialogsPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    addMessage: (newMessageText: string) => void
}
const Dialogs: React.FC<DialogsPropsType> = ({ dialogs, messages, addMessage }) => {
    const dialogsList = dialogs
        .map(dialogItem => <Dialog name={dialogItem.name} key={dialogItem.id} id={dialogItem.id} />)
    const messagesList = messages
        .map(messageItem => <Message text={messageItem.text} key={messageItem.id} id={messageItem.id} />)
    let submit = (value: FormPropsType) => {
        addMessage(value.newMessageText)
    }

    return <div className={s.dialogs}>
        <div className={s.dialogs_items}>
            {dialogsList}
        </div>
        <div>
            <div className={s.messages}>
                {messagesList}
            </div>
            <AddMessageReduxForm onSubmit={submit} />
        </div>
    </div>
}

export default Dialogs
