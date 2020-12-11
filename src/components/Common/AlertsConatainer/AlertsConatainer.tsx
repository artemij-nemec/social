import { Alert } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootStateType } from '../../../redux/redux-store'
import s from './AlertsConatainer.module.css'

const AlertsConatainer: React.FC = () => {
    const alerts = useSelector((state: RootStateType) => state.alertsReducer.alerts)
    return <div className={s.container}>
        {alerts.map((alert, index) => {
            return <Alert
                key={index}
                message={alert.message}
                type={alert.type}
                className={s.alert}
                closable
                showIcon
            />
        })}
    </div>
}

export default AlertsConatainer