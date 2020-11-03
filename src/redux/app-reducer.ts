import { authMe } from "./auth-reducer"

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
export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(authMe())
    promise.then(() => {
        dispatch(initializedSuccess())
    })
}

export default appReducer