"use client"
import Link from "next/link";
import React from "react";
import Toast from "@/app/ui/toast/toast";
import Submit from "@/app/ui/forms/Submit";
import {useFormState} from "react-dom";

export function UserForm({action, user}) {
    const [state, formAction] = useFormState(action, user || undefined)
    return (
        <div className="flex flex-col w-1/2 justify-center">
            <form action={formAction}>
                {/*place the user id as hidden so it will persist if the validation fails and prevState gets overiden*/}
                <input type="hidden" name="id" value={user ? user.id : undefined}/>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Name:</label>
                    <input type="text" defaultValue={user ? user.name : ""} name="name" required={true}
                           className="input input-bordered input-accent w-full"/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email:</label>
                    <input type="email" defaultValue={user ? user.email : ""} name="email" required={true}
                           className="input input-bordered input-accent w-full"/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Phone:</label>
                    <input type="number" defaultValue={user ? user.phone : ""} name="phone" required={true}
                           className="input input-bordered input-accent w-full"/>
                </div>
                <div className="flex justify-between">
                    <div className="mb-4">
                        <select defaultValue={user ? user.role : "general"} className="select select-accent"
                                name="role">
                            <option disabled value="general">Is Admin?</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <select defaultValue={user ? user.isActive : "general"} className="select select-accent"
                                name="isActive">
                            <option disabled value="general">Is Active?</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Address:</label>
                    <textarea className="textarea textarea-bordered w-full textarea-accent"
                              defaultValue={user ? user.address : ""}
                              name="address"
                              rows={3}></textarea>
                </div>
                <div className="flex justify-between items-center">
                    <Submit/>
                    <Link href="/dashboard/users">
                        <button className="btn btn-primary">Back</button>
                    </Link>
                </div>
            </form>
            {state && state.errors && Object.entries(state.errors).map(([field, message]) => (
                <Toast key={`${field}-${message}`} message={message} field={field}/>
            ))}
        </div>
    )
}

export default UserForm