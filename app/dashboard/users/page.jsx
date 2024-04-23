import React from 'react';
import {MdSearch} from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/components/dashboard/pagination/pagination";
import {redirect} from "next/navigation";
import {createClient} from "@/supabase/server";

const supabase = createClient()
const users = [
    {
        id: 1, status: "active",
        name: 'Hart Hagerty',
        email: 'example@email.com',
        created_at: 'United States',
        role: 'Purple',
    },
    {
        id: 2, status: "active",
        name: 'Brice Swyre',
        email: 'example@email.com',
        created_at: 'China',
        role: 'Red',
    },
    {
        id: 3, status: "active",
        name: 'Marjy Ferencz',
        email: 'example@email.com',
        created_at: 'Russia',
        role: 'Crimson',
    },
    {
        id: 4, status: "inactive",
        name: 'Yancy Tear',
        email: 'example@email.com',
        created_at: 'Brazil',
        role: 'Indigo',
    },
    {
        id: 5, status: "active",
        name: 'Lindsy Willbourne',
        email: 'example@email.com',
        created_at: 'Spain',
        role: 'Blue',
    },
    {
        id: 6, status: "active",
        name: 'Graig Muckle',
        email: 'example@email.com',
        created_at: 'France',
        role: 'Green',
    },
    {
        id: 7, status: "active",
        name: 'Janice Shorrock',
        email: 'example@email.com',
        created_at: 'Germany',
        role: 'Black',
    },
    {
        id: 8, status: "inactive",
        name: 'Dionis Burberow',
        email: 'example@email.com',
        created_at: 'Australia',
        role: 'Yellow',
    },
    {
        id: 9, status: "active",
        name: 'Myrtice Scolland',
        email: 'example@email.com',
        created_at: 'Canada',
        role: 'Orange',
    },
    {
        id: 10,
        status: "inactive",
        name: 'Stephanus Brooke',
        email: 'CEO',
        created_at: 'Italy',
        role: 'Teal',
    },
];

const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'active':
            return 'badge badge-success py-3 ';
        case 'inactive':
            return 'badge badge-error py-3';
        default:
            return 'badge';
    }
};


const UsersPage = async (props) => {
    const {
        data: {user},
    } = await supabase.auth.getUser();
    console.log(user)
    if (!user) {
        return redirect("/login");
    }
    return (
        <div className="flex-1">
            <div className="flex items-center gap-3  justify-between">
                <div className="flex items-center gap-3 p-4 rounded">
                    <MdSearch size={40}/>
                    <input type="text" placeholder="Search" className="input input-bordered w-full md:w-auto"/>
                </div>
                <div className="flex items-center">
                    <Link href="/dashboard/users/add">
                        <button className="btn btn-primary">Invite user</button>
                    </Link>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox"/>
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Created at</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td><input type="checkbox" className="checkbox"/></td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <Image src="/avatar_placeholder.png" alt="Avatar" width="48" height="48"
                                                       className="rounded-2xl object-cover"/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-sm opacity-50">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user.created_at}</td>
                                <td>
                                    <div className={getStatusBadgeClass(user.status)}>{user.status}</div>
                                </td>
                                <td className="flex gap-4 py-5">
                                    <Link href="/dashboard/users/1">
                                        <button className="btn btn-primary btn-sm ">View</button>
                                    </Link>
                                    <Link href="/">
                                        <button className="btn btn-error btn-sm">Delete</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Pagination/>

                </div>
            </div>
        </div>
    );
};

export default UsersPage;