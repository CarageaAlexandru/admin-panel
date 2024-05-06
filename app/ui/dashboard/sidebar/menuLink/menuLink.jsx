"use client"
import React from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import clsx from "clsx";


const MenuLink = ({item}) => {
    const pathname = usePathname()
    // noinspection JSAnnotator
    return (
        <Link href={item.path} className={clsx(
            "p-3 m-2 flex items-center gap-3 hover:bg-accent hover:text-white rounded",
            {
                "bg-accent text-white": pathname === item.path
            }
        )}>
            {item.icon}
            {item.title}
        </Link>
    );
};

export default MenuLink;