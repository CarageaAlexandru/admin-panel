import React, {Suspense} from 'react';
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import {fetchUsers} from "@/app/lib/data";
import Search from "@/app/ui/dashboard/search/search";
import {formatDate} from "@/app/lib/utils";
import clsx from "clsx";
import {deleteUserById} from "@/app/dashboard/users/actions";


export default async function UsersPage({searchParams}) {
    const query = searchParams?.name || ""
    const page = parseInt(searchParams?.page) || 1
    const {users, count} = await fetchUsers(query, page)


    // noinspection JSAnnotator
    return (
        <div className="flex-1">
            <div className="flex items-center gap-3  justify-between">
                <Search placeholder="Search user" queryParam="name"/>
                <div className="flex items-center">
                    <Link href="/dashboard/users/add">
                        <button className="btn btn-primary">Invite user</button>
                    </Link>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
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
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(({id, name, email, created_at, phone, address, admin, isActive}) => (
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
                                <td>{formatDate(created_at)}</td>
                                <td>
                                    <div className={clsx(
                                        "badge", {
                                            "badge badge-success py-3": isActive === true,
                                            "badge badge-error py-3": isActive === false
                                        }
                                    )}>{isActive ? "Active" : "Inactive"}</div>
                                </td>
                                <td>
                                    <div className={clsx(
                                        "badge", {
                                            "badge badge-warning py-3 ": admin === true,
                                            "badge badge-secondary py-3": admin === false
                                        }
                                    )}>{admin ? "Admin" : "Client"}</div>
                                </td>
                                <td>
                                    <div className="font-bold">0{phone}</div>
                                </td>
                                <td>
                                    <div className="font-bold">{address}</div>
                                </td>
                                <td className="flex gap-4 py-5">
                                    <Link href={`/dashboard/users/${id}`}>
                                        <button className="btn btn-primary btn-sm ">View</button>
                                    </Link>
                                    <form action={deleteUserById}>
                                        <input type="hidden" name="id" value={id}/>
                                        <button className="btn btn-error btn-sm">Delete</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Suspense fallback={<p>Loading...</p>}>
                        <Pagination count={count}/>
                    </Suspense>

                </div>
            </div>
        </div>
    );
};
