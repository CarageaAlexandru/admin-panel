"use client"
import React from 'react';
import {
    MdDashboard,
    MdSupervisedUserCircle,
    MdShoppingBag,
    MdAttachMoney,
    MdWork,
    MdAnalytics,
    MdPeople,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout
} from "react-icons/md";
import MenuLink from "@/app/components/dashboard/sidebar/menuLink/menuLink";
import Image from "next/image";

const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard/>,
            },
            {
                title: "Users",
                path: "/dashboard/users",
                icon: <MdSupervisedUserCircle/>,
            },
            {
                title: "Products",
                path: "/dashboard/products",
                icon: <MdShoppingBag/>,
            },
            {
                title: "Transactions",
                path: "/dashboard/transactions",
                icon: <MdAttachMoney/>,
            },
        ],
    },
    {
        title: "Analytics",
        list: [
            {
                title: "Revenue",
                path: "/dashboard/revenue",
                icon: <MdWork/>,
            },
            {
                title: "Reports",
                path: "/dashboard/reports",
                icon: <MdAnalytics/>,
            },
            {
                title: "Teams",
                path: "/dashboard/teams",
                icon: <MdPeople/>,
            },
        ],
    },
    {
        title: "User",
        list: [
            {
                title: "Settings",
                path: "/dashboard/settings",
                icon: <MdOutlineSettings/>,
            },
            {
                title: "Help",
                path: "/dashboard/help",
                icon: <MdHelpCenter/>,
            },
        ],
    },
];
const Sidebar = () => {
    return (
        <div className="sticky top-2 shadow-lg h-lvh">
            <div className="flex items-center gap-2 mb-4">
                <Image src="/avatar_placeholder.png" alt="Avatar" width="50" height="50"
                       className="rounded-2xl object-cover"/>
                <div className="flex flex-col">
                    <span className="font-bold">Caragea Alexandru</span>
                    <span className="text-sm">Admin</span>
                </div>
            </div>
            <ul className="list-none">
                {menuItems.map((item) => (
                    <li key={item.title}>
                        <span className="text-xl font-semibold bg-base-100 p-2">{item.title}</span>
                        {item.list.map((item) => (
                            <MenuLink key={item.title} item={item}/>
                        ))}
                    </li>
                ))}
            </ul>
            <button className="btn btn-accent mt-2">Logout</button>
        </div>
    );
};

export default Sidebar;