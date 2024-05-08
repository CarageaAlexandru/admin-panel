import React from 'react';
import Image from 'next/image';
import {redirect} from "next/navigation";
import {createClient} from "@/supabase/server";
import {fetchUserById} from "@/app/lib/data";
import UpdateUserForm from "@/app/ui/forms/update-user";

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
                <UpdateUserForm user={user_}/>
            </div>
        </div>
    );
};
