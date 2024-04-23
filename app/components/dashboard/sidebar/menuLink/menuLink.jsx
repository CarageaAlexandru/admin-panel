"use client"
import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";


const MenuLink = ({item}) => {
    const pathname = usePathname()
    return (
        <Link href={item.path} className="p-3 m-2 flex items-center gap-3 hover:bg-primary hover:text-white rounded">
            {item.icon}
            {item.title}
        </Link>
    );
};

export default MenuLink;