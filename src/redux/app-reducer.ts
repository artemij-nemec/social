import { ThunkAction } from "redux-thunk"
import { authMe } from "./auth-reducer"
import { RootStateType } from "./redux-store"

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'

let initialState = {
    initialized: false
}
export type AppStateType = typeof initialState
type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
let appReducer = (state: AppStateType = initialState, action: InitializedSuccessActionType): AppStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })
type ThunkType = ThunkAction<Promise<void>, RootStateType, unknown, InitializedSuccessActionType>
export const initializeApp = (): ThunkType => async dispatch => {
    await dispatch(authMe())
    dispatch(initializedSuccess())
}

export default appReducer