import React from 'react';
import Image from 'next/image';
import {redirect} from "next/navigation";
import {createClient} from "@/supabase/server";

export default async function ViewUserPage() {
    const supabase = createClient()

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    const user_ = {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password", // Note: Typically you wouldn't display a password!
        isAdmin: "Yes",
        isActive: "Yes",
        phone: "+1234567890",
        address: "1234 Street, City, Country"
    };

    return (
        <div className="flex items-start justify-center p-5">
            <div className="flex flex-col items-center justify-center">
                <div>
                    <Image src="/avatar_placeholder.png" alt="User Image" width={300} height={300}/>
                </div>
            </div>

            <div className="flex-1 max-w-md px-6">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Name:</label>
                    <input type="text" value={user_.name} className="input input-bordered w-full" readOnly/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email:</label>
                    <input type="email" value={user_.email} className="input input-bordered w-full" readOnly/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Phone:</label>
                    <input type="text" value={user_.phone} className="input input-bordered w-full" readOnly/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Is Admin?</label>
                    <input type="text" value={user_.isAdmin} className="input input-bordered w-full" readOnly/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Is Active?</label>
                    <input type="text" value={user_.isActive} className="input input-bordered w-full" readOnly/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Address:</label>
                    <textarea className="textarea textarea-bordered w-full" value={user_.address} readOnly
                              rows={3}></textarea>
                </div>
                <button className="btn btn-accent">Update</button>
            </div>
        </div>
    );
};
