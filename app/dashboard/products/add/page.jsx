import React from 'react';
import {ProductForm} from "@/app/ui/forms/ProductForm";
import {addProduct} from "@/app/dashboard/products/actions";

export default async function AddProductPage() {

    return (
        <div className="flex flex-1 items-center justify-center min-h-max p-5">
            <ProductForm action={addProduct} product={null}/>
        </div>
    );
};
