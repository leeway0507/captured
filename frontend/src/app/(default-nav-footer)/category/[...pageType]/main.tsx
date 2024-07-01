'use client';
import { useState } from "react";
import CategoryFilter from "./cateogry-filter";
import InfiniteCardArray from "./component/infinite-scroll/infinite-card-array";

function createFilterValue(filterParams: any) {
    const filter = new URLSearchParams(filterParams);
    const filterValue: { [key: string]: string[] } = {};

    filter.forEach((value, key) => {
        filterValue[key] = value.split(",");
    });

    return filterValue;
}


export default function Main({initFilterMeta,filterParams,pageType}:{initFilterMeta:any,filterParams:any,pageType:any}){
    
const [filter, setFilter] = useState({});
const filterValue: { [key: string]: string[] } = createFilterValue(filterParams);
return <>
    <CategoryFilter initFilterMeta={initFilterMeta} pageType={pageType} filterValue={filterValue} setFilter={setFilter}>
    <InfiniteCardArray filter={filter} setFilter={setFilter} />
    </CategoryFilter>
  </>
}
