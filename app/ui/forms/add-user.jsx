"use client"

import {inviteByEmail} from "@/app/dashboard/users/actions";
import React from "react";
import {useFormState} from "react-dom"
import Toast from "@/app/ui/toast/toast";
import Submit from "@/app/ui/forms/Submit";

export function AddUserForm() {
    const [state, formAction] = useFormState(inviteByEmail, undefined)
    return (
        <div className="flex flex-col max-w-screen-lg">
            <form action={formAction} className="flex flex-wrap gap-6 justify-center p-10 shadow-lg">
                <input type="text" placeholder="Name" name="name"
                       className="input input-bordered input-accent w-full max-w-xs"/>
                <input type="email" placeholder="Email" name="email"
                       className="input input-bordered input-accent w-full max-w-xs"/>
                <select className="select select-accent w-full max-w-xs" name="role" id="role"
                        defaultValue={"isAdmin"}>
                    <option disabled value="isAdmin">Is Admin ?</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                <select className="select select-accent w-full max-w-xs" name="isActive" id="isActive"
                        defaultValue={"isActive"}>
                    <option disabled value="isActive">Is Active ?</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                <input type="number" placeholder="Phone" name="phone"
                       className="input input-bordered input-accent w-full max-w-xs"/>
                <textarea className="textarea textarea-accent flex-grow w-full" placeholder="Address" rows="5"
                          id="address"
                          name="address"
                ></textarea>
                <Submit/>
            </form>
            {state && state.errors && Object.entries(state.errors).map(([field, message]) => (
                <Toast key={`${field}-${message}`} message={message} field={field}/>
            ))}
        </div>
    )
}

export default AddUserForm