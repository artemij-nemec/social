import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import { reducer as formReducer } from "redux-form"
import reduxThunk from "redux-thunk"
import appReducer from "./app-reducer"
import authReducer from "./auth-reducer"
import dialogsReducer from "./dialogs-reducer"
import navbarReducer from "./navbar-reducer"
import profileReducer from "./profile-reducer"
import usersReducer from "./users-reducer"

let reducers = combineReducers({
    profileReducer,
    dialogsReducer,
    navbarReducer,
    usersReducer,
    authReducer,
    appReducer,
    form: formReducer
})
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))
type Actions = {
    [key: string]: (...args: any[]) => {
        type: string
        [key: string]: any
    }
}
type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never
export type ActionTypes<T extends Actions> = ReturnType<InferValueTypes<T>>

export type RootStateType = ReturnType<typeof reducers>
export default store
