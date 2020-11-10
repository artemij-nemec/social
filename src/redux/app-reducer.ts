import { ThunkAction } from "redux-thunk"
import { authMe } from "./auth-reducer"
import { ActionTypes, RootStateType } from "./redux-store"

let initialState = {
    initialized: false
}
export type AppStateType = typeof initialState
type ActionsType = ActionTypes<typeof actions>
let appReducer = (state: AppStateType = initialState, action: ActionsType): AppStateType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

const actions = {
    initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' } as const)
}
type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, ActionsType>
export const initializeApp = (): ThunkType => async dispatch => {
    await dispatch(authMe())
    dispatch(actions.initializedSuccess())
}

export default appReducer