import React from 'react';
import {MdSearch} from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/components/dashboard/pagination/pagination";
import {redirect} from "next/navigation";
import {createClient} from "@/supabase/server";

const getStatusBadgeClass = (status) => {
    switch (status) {
        case true:
            return 'badge badge-success py-3 ';
        case false:
            return 'badge badge-error py-3';
        default:
            return 'badge';
    }
};

const getRoleBadgeClass = (role) => {
    switch (role) {
        case true:
            return 'badge badge-warning py-3 ';
        case false:
            return 'badge badge-secondary py-3';
        default:
            return 'badge';
    }
};


export default async function UsersPage() {
    const supabase = createClient()
    const {
        data: {user},
    } = await supabase.auth.getUser();
    if (!user) {
        return redirect("/login");
    }


    let {data: users, error} = await supabase
        .from('usesrs')
        .select('*')

    if (error) {
        throw new Error(error.message)
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
                            <th>Role</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(({id, name, email, created_at, phone, address, role, isActive}) => (
                            <tr key={id}>
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
                                            <div className="font-bold">{name}</div>
                                            <div className="text-sm opacity-50">{email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{new Date(created_at).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: "numeric"
                                })}</td>
                                <td>
                                    <div
                                        className={getStatusBadgeClass(isActive)}>{isActive ? "Active" : "Inactive"}</div>
                                </td>
                                <td>
                                    <div className={getRoleBadgeClass(role)}>
                                        {role ? "Admin" : "Client"}
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">{address}</div>
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
