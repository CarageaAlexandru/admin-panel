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
            <form action="" className="flex flex-wrap gap-6 justify-center p-10 shadow-lg">
                <input type="text" placeholder="Name" required={true} name="name"
                       className="input input-bordered input-accent w-full max-w-xs"/>
                <input type="email" placeholder="Email" required={true} name="email"
                       className="input input-bordered input-accent w-full max-w-xs"/>
                <select className="select select-accent w-full max-w-xs" name="role" id="role"
                        defaultValue={"no"}>
                    <option disabled value="no">Is Admin ?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <select className="select select-accent w-full max-w-xs" name="role" id="role"
                        defaultValue={"yes"}>
                    <option disabled value="yes">Is Active ?</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                <input type="number" placeholder="Phone" required={true} name="phone"
                       className="input input-bordered input-accent w-full max-w-xs"/>
                <textarea className="textarea textarea-accent flex-grow w-full" placeholder="Address" rows="5"
                          id="address"
                          name="address"
                ></textarea>
                <button className="btn btn-accent" formAction={inviteByEmail}>Submit</button>
            </form>
        </div>

    );
};
