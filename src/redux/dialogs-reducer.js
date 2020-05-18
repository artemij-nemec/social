const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    dialogs: [
        { id: 1, name: 'user 1' },
        { id: 2, name: 'user 2' },
        { id: 3, name: 'user 3' }
    ],
    messages: [
        { id: 1, text: 'Hi' },
        { id: 2, text: 'fdfgs' },
        { id: 3, text: '456456' }
    ],
}
const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages,
                {
                    id: (state.messages.length + 1),
                    text: action.newText
                }],
                newMessageText: ''
            }
        default:
            return state
    }
}

export const sendMessageActionCreator = newText => ({
    type: SEND_MESSAGE,
    newText
})

export default dialogsReducer
