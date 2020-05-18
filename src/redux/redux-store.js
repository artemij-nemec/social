import { createStore, combineReducers, applyMiddleware } from "redux"
import dialogsReducer from "./dialogs-reducer"
import profileReducer from "./profile-reducer"
import navbarReducer from "./navbar-reducer"
import usersReducer from "./users-reducer"
import authReducer from "./auth-reducer"
import reduxThunk from "redux-thunk"
import { reducer as formReducer } from "redux-form"
import appReducer from "./app-reducer"

let reducers = combineReducers({
    profileReducer,
    dialogsReducer,
    navbarReducer,
    usersReducer,
    authReducer,
    appReducer,
    form: formReducer
})

let store = createStore(reducers, applyMiddleware(reduxThunk))

export default store
