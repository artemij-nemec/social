import React, { Component } from 'react'
import s from './Paginator.module.css'

class Paginator extends Component {
    state = {
        currentPortion: 1
    }

    render () {
        const pagesCount = Math.ceil(this.props.totalItemsCount / this.props.pageSize)
        const portionSize = this.props.portionSize ? this.props.portionSize : 10
        const portionsCount = Math.ceil(this.props.totalItemsCount / portionSize)
        const portionFirst = (this.state.currentPortion - 1) * portionSize + 1
        let portionLast = this.state.currentPortion * portionSize
        portionLast = portionLast > pagesCount ? pagesCount : portionLast
        let pages = []
        for (let i = portionFirst; i <= portionLast; i++) {
            pages.push(i)
        }

        return (
            <div className={s.paginatorContainer}>
                {this.state.currentPortion > 1 &&
                    <button
                        key='prev'
                        className={s.prevButton}
                        onClick={() => {
                            this.setState(prevState => ({currentPortion: prevState.currentPortion - 1}))
                        }}
                    >
                        prev
                    </button>
                }
                {pages.map(page =>
                    <button
                        key={page}
                        className={s.pageButton + ' ' + (page === this.props.currentPage ? s.selectedPage : '')}
                        onClick={() => {
                            this.props.onPageChanged(page)
                        }}
                    >
                        {page}
                    </button>
                )}
                {portionsCount > this.state.currentPortion &&
                    <button
                        key='next'
                        onClick={() => {
                            this.setState(prevState => ({currentPortion: prevState.currentPortion + 1}))
                        }}
                    >
                        next
                    </button>
                }
            </div>
        )
    }
}

export default Paginator