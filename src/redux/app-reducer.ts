import { authMe } from "./auth-reducer"
import { ActionTypes, ThunkType } from "./redux-store"

let initialState = {
    initialized: false
}
type AppStateType = typeof initialState
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
export const initializeApp = (): ThunkType<ActionsType> => async dispatch => {
    await dispatch(authMe())
    dispatch(actions.initializedSuccess())
}

export default appReducer