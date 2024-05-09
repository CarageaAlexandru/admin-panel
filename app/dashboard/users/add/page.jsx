import React from 'react';
import {redirect} from "next/navigation";
import {createClient} from "@/supabase/server";
import UserForm from "@/app/ui/forms/UserForm";
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
        <div className="flex items-center justify-center min-h-max min-w-max ">
            <UserForm action={inviteByEmail} user={null}/>
        </div>

    );
};
