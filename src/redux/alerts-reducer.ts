import { ActionTypes } from "./redux-store"

enum AlertTypes {
    Success = 'success',
    Error = 'error',
    Warning = 'warning',
    Info = 'info'
}
type Alert = {
    id:         number
    message:    string
    type:       AlertTypes
}

let initialState = {
    alerts: [] as Array<Alert>,
    nextId: 1
}
export type AlertsStateType = typeof initialState
export type AlertActionsType = ActionTypes<typeof actions>
const alertsReducer = (state = initialState, action: AlertActionsType): AlertsStateType => {
    switch (action.type) {
        case 'ADD_ALERT':
            return {
                alerts: [...state.alerts,
                {
                    id: state.nextId,
                    message: action.message,
                    type: action.alertType
                }
                ],
                nextId: state.nextId + 1
            }
        case 'DELETE_ALERT':
            return {
                ...state,
                alerts: state.alerts.filter(alert => alert.id !== action.alertID)
            }
        default:
            return state
    }
}

const actions = {
    addAlert: (message: string, alertType: AlertTypes) => ({
        type: 'ADD_ALERT',
        message,
        alertType
    } as const),
    addErrorAllert: (message: string) => ({
        type: 'ADD_ALERT',
        message,
        alertType: AlertTypes.Error
    } as const),
    addSuccessAllert: (message: string) => ({
        type: 'ADD_ALERT',
        message,
        alertType: AlertTypes.Success
    } as const),
    deleteAlert: (alertID: number) => ({
        type: 'DELETE_ALERT',
        alertID
    } as const)
}
export { actions as alertsActions }
export default alertsReducer
