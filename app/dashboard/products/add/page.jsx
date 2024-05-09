import React from 'react';
import {redirect} from "next/navigation";
import {createClient} from "@/supabase/server";
import {ProductForm} from "@/app/ui/forms/ProductForm";
import {addProduct} from "@/app/dashboard/products/actions";

export default async function AddProductPage() {
    const supabase = createClient()
    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    return (
        <div className="flex items-center justify-center min-h-max p-5">
            <ProductForm action={addProduct} product={null}/>
        </div>
    );
};
