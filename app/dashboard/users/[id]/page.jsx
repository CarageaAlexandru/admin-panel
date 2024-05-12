import React from 'react';
import Image from 'next/image';
import {fetchUserById} from "@/app/lib/data";
import {updateUserById} from "@/app/dashboard/users/actions";
import UserForm from "@/app/ui/forms/UserForm";

export default async function ViewUserPage({params}) {
    const {id} = params
    const user = await fetchUserById(id)
    return (
        <div className="flex flex-1 items-center justify-center min-h-max p-5">
            <div className="flex flex-col items-center justify-center w-1/2">
                <div>
                    <Image src="/avatar_placeholder.png" alt="User Image" width={300} height={300}/>
                </div>
                <UserForm action={updateUserById} user={user}/>
            </div>

        </div>
    );
};
