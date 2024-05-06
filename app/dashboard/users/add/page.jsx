import React from 'react';
import {redirect} from "next/navigation";
import {createClient} from "@/supabase/server";
import AddUserForm from "@/app/ui/forms/add-user";

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
            <AddUserForm/>
        </div>

    );
};
