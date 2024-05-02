"use client"
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import React from 'react';

const Pagination = ({count}) => {
    const searchParams = useSearchParams()
    const {replace} = useRouter()
    const pathname = usePathname()
    const page = parseInt(searchParams.get("page")) || 1
    const ITEMS_PER_PAGE = 5

    const params = new URLSearchParams(searchParams)
    const hasPrev = ITEMS_PER_PAGE * (page - 1) > 0
    const hasNext = ITEMS_PER_PAGE * (page - 1) + ITEMS_PER_PAGE < count

    const handlePageChange = (type) => {
        type === "prev" ? params.set("page", parseInt(page) - 1) : params.set("page", parseInt(page) + 1)
        replace(`${pathname}?${params}`)
    }


    return (
        <div className="flex flex-row items-center justify-between py-4">
            <button className="btn btn-accent" disabled={!hasPrev} onClick={() => handlePageChange("prev")}>Prev
            </button>
            <button className="btn btn-accent" disabled={!hasNext} onClick={() => handlePageChange("next")}>Next
            </button>
        </div>
    );
};

export default Pagination;