import React from 'react'
import s from './Preloader.module.css'
import loadingImg from '../../../assets/images/loading.svg'

const Preloader: React.FC = () => {
    return <div className={s.preloaderContainer}>
        <img src={loadingImg} alt='Loading...' className={s.preloaderImage} />
    </div>
}

export default Preloader