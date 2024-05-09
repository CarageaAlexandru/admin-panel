import React from 'react';
import Image from 'next/image';
import {redirect} from "next/navigation";
import {createClient} from "@/supabase/server";
import {fetchUserById} from "@/app/lib/data";
import {updateUserById} from "@/app/dashboard/users/actions";
import UserForm from "@/app/ui/forms/UserForm";

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
        <div className="flex flex-1 items-center justify-center min-h-max p-5">
            <div className="flex flex-col items-center justify-center w-1/2">
                <div>
                    <Image src="/avatar_placeholder.png" alt="User Image" width={300} height={300}/>
                </div>
                <UserForm action={updateUserById} user={user_}/>
            </div>

        </div>
    );
};
