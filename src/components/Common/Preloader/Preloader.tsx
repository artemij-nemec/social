import React from 'react'
import s from './Preloader.module.css'
import { Spin } from 'antd'

const Preloader: React.FC = () => {
    return <div className={s.preloaderContainer}>
        <Spin tip="Loading..." size="large" className={s.preloaderSpinner} />
    </div>
}

export default Preloader