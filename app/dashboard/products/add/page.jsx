import React from 'react';
import {redirect} from "next/navigation";
import {createClient} from "@/supabase/server";
import {AddProductForm} from "@/app/ui/forms/add-product";

export default async function AddProductPage() {
    const supabase = createClient()
    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <AddProductForm/>
        </div>
    );
};
