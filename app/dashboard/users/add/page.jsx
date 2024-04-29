import React from 'react';
import {redirect} from "next/navigation";
import {createClient} from "@/supabase/server";
import {inviteByEmail} from "@/app/dashboard/users/actions";

export default async function UserPage() {
    const supabase = createClient()

    const {
        data: {user},
    } = await supabase.auth.getUser();
    if (!user) {
        return redirect("/login");
    }

    return (
        <div className="flex items-center justify-center">
            <form action={inviteByEmail} className="flex flex-wrap gap-6 justify-center p-10 shadow-lg">
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
                <button className="btn btn-accent" type="submit">Submit</button>
            </form>
        </div>

    );
};
