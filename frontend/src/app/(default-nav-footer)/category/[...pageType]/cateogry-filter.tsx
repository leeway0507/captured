'use client'

import React, { useState } from 'react'
import FilterLayout from './component/filter/filter-layout'
import MobileFilterNav from './component/filter/mobile-filter'
import { initFilterMetaProps, filterMetaProps } from './type'
import useProductFilter, { useProductFilterProps } from './component/filter/hook/use-product-filter'

export default function CateogryFilter({
    children,
    filterValue,
    initFilterMeta,
    pageType,
}: {
    children: React.ReactNode
    filterValue: filterMetaProps
    initFilterMeta: initFilterMetaProps
    pageType: string[]
}) {
    const [openFilter, setOpenFilter] = useState<boolean>(true)
    const filterToggle = () => {
        setOpenFilter(!openFilter)
    }
    const productFilter: useProductFilterProps | null = useProductFilter(initFilterMeta, pageType[0], filterValue)
    if (productFilter === null) return null
    const stickyClass = 'sticky top-[50px] z-10 h-[100px] '
    const pcClass = 'tb:block tb:top-[60px]'
    const FilterPage = (
        <>
            <MobileFilterNav isOpen={openFilter} openToggle={filterToggle} pageType={pageType[0]} />
            <div className={`${stickyClass} ${pcClass} ${openFilter ? 'block' : 'hidden'} `}>
                <div className="bg-white py-4">
                    <FilterLayout productFilter={productFilter} pageType={pageType[0]} />
                </div>
            </div>
        </>
    )
    return (
        <div className="main-frame max-w-[1660px] justify-between px-2 tb:px-4 ">
            {FilterPage}
            <div className="w-full flex-grow">{children}</div>
        </div>
    )
}
