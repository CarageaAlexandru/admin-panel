"use client"
import {updateUserById} from "@/app/dashboard/users/actions";
import Link from "next/link";
import React from "react";
import Toast from "@/app/ui/toast/toast";
import Submit from "@/app/ui/forms/Submit";
import {useFormState} from "react-dom";

export function UpdateUserForm({user}) {
    const [state, formAction] = useFormState(updateUserById, user)
    return (
        <div>
            <form action={formAction}>
                <input type="hidden" name="id" value={user.id}/>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Name:</label>
                    <input type="text" defaultValue={user.name} name="name" required={true}
                           className="input input-bordered input-accent w-full"/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email:</label>
                    <input type="email" defaultValue={user.email} name="email" required={true}
                           className="input input-bordered input-accent w-full"/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Phone:</label>
                    <input type="number" defaultValue={user.phone} name="phone" required={true}
                           className="input input-bordered input-accent w-full"/>
                </div>
                <div className="flex justify-between">
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Is Admin?</label>
                        <select defaultValue={user.role} className="select select-accent" name="role">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Is Active?</label>
                        <select defaultValue={user.isActive} className="select select-accent" name="isActive">
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Address:</label>
                    <textarea className="textarea textarea-bordered w-full textarea-accent"
                              defaultValue={user.address}
                              name="address"
                              rows={3}></textarea>
                </div>
                <div className="flex justify-between items-center">
                    <Submit/>
                    <Link href="/dashboard/users">
                        <button className="btn btn-primary">Back to List</button>
                    </Link>
                </div>
            </form>
            {state && state.errors && Object.entries(state.errors).map(([field, message]) => (
                <Toast key={`${field}-${message}`} message={message} field={field}/>
            ))}
        </div>
    )
}

export default UpdateUserForm