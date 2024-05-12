import React from 'react';
import UserForm from "@/app/ui/forms/UserForm";
import {inviteByEmail} from "@/app/dashboard/users/actions";

export default async function UserPage() {
    return (
        <div className="flex flex-1 items-center justify-center min-h-max min-w-max ">
            <UserForm action={inviteByEmail} user={null}/>
        </div>

    );
};
