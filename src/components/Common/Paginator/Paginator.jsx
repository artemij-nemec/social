import React, { useState } from 'react'
import s from './Paginator.module.css'

const Paginator = props => {
    let [currentPortion, setCurrentPortion] = useState(1)
    const pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
    const portionSize = props.portionSize ? props.portionSize : 10
    const portionsCount = Math.ceil(props.totalItemsCount / portionSize)
    const portionFirst = (currentPortion - 1) * portionSize + 1
    let portionLast = currentPortion * portionSize
    portionLast = portionLast > pagesCount ? pagesCount : portionLast
    let pages = []
    for (let i = portionFirst; i <= portionLast; i++) {
        pages.push(i)
    }

    return (
        <div className={s.paginatorContainer}>
            {currentPortion > 1 &&
                <button
                    key='prev'
                    className={s.prevButton}
                    onClick={() => {
                        setCurrentPortion(currentPortion - 1)
                    }}
                >
                    prev
                    </button>
            }
            {pages.map(page =>
                <button
                    key={page}
                    className={s.pageButton + ' ' + (page === props.currentPage ? s.selectedPage : '')}
                    onClick={() => {
                        props.onPageChanged(page)
                    }}
                >
                    {page}
                </button>
            )}
            {portionsCount > currentPortion &&
                <button
                    key='next'
                    onClick={() => {
                        setCurrentPortion(currentPortion + 1)
                    }}
                >
                    next
                    </button>
            }
        </div>
    )
}

export default Paginator