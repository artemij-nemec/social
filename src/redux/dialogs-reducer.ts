import { ActionTypes } from "./redux-store"

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    text: string
}
let initialState = {
    dialogs: [
        { id: 1, name: 'user 1' },
        { id: 2, name: 'user 2' },
        { id: 3, name: 'user 3' }
    ] as Array<DialogType>,
    messages: [
        { id: 1, text: 'Hi' },
        { id: 2, text: 'fdfgs' },
        { id: 3, text: '456456' }
    ] as Array<MessageType>,
    newMessageText: ''
}
export type DialogsStateType = typeof initialState
type ActionsType = ActionTypes<typeof actions>
const dialogsReducer = (state = initialState, action: ActionsType): DialogsStateType => {
    switch (action.type) {
        case 'SEND_MESSAGE':
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

export const actions = {
    sendMessageActionCreator: (newText: string) => ({
        type: 'SEND_MESSAGE',
        newText
    } as const)
}

export default dialogsReducer
