"use client"
import React from 'react';
import {MdNotifications, MdOutlineChat, MdPublic, MdSearch} from "react-icons/md";
import {usePathname} from "next/navigation";

const Navbar = (props) => {
    const pathname = usePathname()
    return (
        <div className="flex items-center p-2 justify-between shadow-lg">
            <div className="font-semibold capitalize">{pathname.split("/").pop()}</div>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 p-4">
                    <MdSearch size={40}/>
                    <input type="text" placeholder="Search" className="input input-bordered w-full md:w-auto"/>
                </div>
            </div>
            <div className="flex gap-3">
                <MdOutlineChat size={30}/>
                <MdNotifications size={30}/>
                <MdPublic size={30}/>
            </div>
        </div>
    );
};

export default Navbar;