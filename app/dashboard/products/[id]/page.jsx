import React from 'react';
import Image from 'next/image';
import {fetchProductById} from "@/app/lib/data";
import {updateProductById} from "@/app/dashboard/products/actions";
import {ProductForm} from "@/app/ui/forms/ProductForm";

export default async function SingleProductPage({params}) {
    const {id} = params
    const product = await fetchProductById(id)
    return (
        <div className="flex flex-1 items-center justify-center min-h-max p-5">
            <div className="flex flex-col gap-2 items-center justify-center w-1/2">
                <Image src="/avatar_placeholder.png" alt="Product Image" width={300} height={300}/>
                <ProductForm action={updateProductById} product={product}/>
            </div>
        </div>
    );
};
