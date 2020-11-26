import { Pagination } from "antd"
import React from 'react'

export type PaginatorOnPageChangeType = (page: number, pageSize?: number | undefined) => void
export type PaginatorOnShowSizeChange = (current: number, size: number) => void
type PaginatorPropsType = {
    totalItemsCount:    number
    pageSize:           number
    currentPage:        number
    onPageChanged:      PaginatorOnPageChangeType
    onShowSizeChange:   PaginatorOnShowSizeChange
}
const Paginator: React.FC<PaginatorPropsType> = ({ currentPage, totalItemsCount, onPageChanged, onShowSizeChange }) => {
    return <Pagination
        current={currentPage}
        total={totalItemsCount}
        hideOnSinglePage={true}
        onChange={onPageChanged}
        onShowSizeChange={onShowSizeChange}
    />
}

export default Paginator