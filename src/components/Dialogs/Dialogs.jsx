import React from 'react'
import s from './Dialogs.module.css'
import Dialog from './Dialog/Dialog'
import Message from './Message/Message'
import { Field, reduxForm, reset } from 'redux-form'
import { required, maxLengthCreator } from '../../utils/validators/validators'
import { TextArea } from '../Common/FormControls/FormControls'

const maxLength = maxLengthCreator(50)
const AddMessageForm = ({ handleSubmit }) => {
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
const afterSubmit = (result, dispatch) => dispatch(reset('addMessage'))
const AddMessageReduxForm = reduxForm({
    form: 'addMessage',
    onSubmitSuccess: afterSubmit
})(AddMessageForm)

function Dialogs({ dialogs, messages, addMessage }) {
    const dialogsList = dialogs
        .map(dialogItem => <Dialog name={dialogItem.name} key={dialogItem.id} id={dialogItem.id} />)
    const messagesList = messages
        .map(messageItem => <Message text={messageItem.text} key={messageItem.id} />)
    let submit = value => {
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
