"use client"
import React from 'react';
import {MdSearch} from "react-icons/md";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebounce, useDebouncedCallback} from "use-debounce";

const Search = ({placeholder}) => {
    const searchParams = useSearchParams()
    const {replace} = useRouter()
    const pathname = usePathname()

    // wait for user to finish typing
    const handleSearch = useDebouncedCallback((e) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", 1)
        if (e.target.value) {
            e.target.value.length > 2 && params.set("name", e.target.value)
        } else {
            params.delete("name")
        }
        replace(`${pathname}?${params}`)
    }, 500)

    return (
        <div className="flex items-center gap-3 p-4 rounded">
            <MdSearch size={40}/>
            <input type="text" placeholder={placeholder} className="input input-bordered w-full md:w-auto"
                   onChange={handleSearch}/>
        </div>
    );
};

export default Search;