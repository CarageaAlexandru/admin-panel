import React from 'react';
import Image from 'next/image';
import {redirect} from "next/navigation";
import {createClient} from "@/supabase/server";
import {fetchUserById} from "@/app/lib/data";
import {updateUserById} from "@/app/dashboard/users/actions";

export default async function ViewUserPage({params}) {
    const supabase = createClient()
    const {id} = params
    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    const user_ = await fetchUserById(id)
    return (
        <div className="flex items-start justify-center p-5">
            <div className="flex flex-col items-center justify-center">
                <div>
                    <Image src="/avatar_placeholder.png" alt="User Image" width={300} height={300}/>
                </div>
            </div>
            <div className="flex-1 max-w-md px-6">
                <form action={updateUserById}>
                    <input type="hidden" id="id" value={id} name="id"/>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Name:</label>
                        <input type="text" defaultValue={user_.name} name="name"
                               className="input input-bordered input-accent w-full"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Email:</label>
                        <input type="email" defaultValue={user_.email} name="email"
                               className="input input-bordered input-accent w-full"/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Phone:</label>
                        <input type="text" defaultValue={user_.phone} name="phone"
                               className="input input-bordered input-accent w-full"/>
                    </div>
                    <div className="flex justify-between">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Is Admin?</label>
                            <select defaultValue={user_.role} className="select select-accent" name="role">
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Is Active?</label>
                            <select defaultValue={user_.isActive} className="select select-accent" name="isActive">
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Address:</label>
                        <textarea className="textarea textarea-bordered w-full textarea-accent"
                                  defaultValue={user_.address}
                                  name="address"
                                  rows={3}></textarea>
                    </div>
                    <button className="btn btn-accent">Update</button>
                </form>
            </div>
        </div>
    );
};
