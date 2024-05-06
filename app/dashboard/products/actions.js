'use server'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {createClient} from "@/supabase/server";
import {ProductSchema} from "@/app/validations/product";

export async function addProduct(formData) {
    const supabase = createClient()
    const product = {
        title: formData.get('title'),
        category: formData.get('category'),
        price: JSON.parse(formData.get('price')),
        stock: JSON.parse(formData.get("stock")),
        color: formData.get('color'),
        size: formData.get('size'),
        description: formData.get('description')
    };

    try {
        ProductSchema.parse(product)
    } catch (error) {
        console.error('Invalid product data:', error);
        redirect(`/dashboard/products/add?message=${encodeURI(error.issues.map(issue => issue.message).join(", "))}`)
        return;
    }


    const {data, error} = await supabase
        .from('products')
        .insert(product)

    if (error) {
        console.error('Error inserting product:', error);
        if (error) {
            redirect(`/dashboard/products/add?message=${encodeURI(error.message)}`)
        }
    }

    revalidatePath('/dashboard/products', 'page')
    redirect('/dashboard/products')
}

export async function deleteProductById(formData) {
    const supabase = createClient()
    const id = formData.get("id")
    const {error} = await supabase.from("products").delete().eq("id", id)

    if (error) {
        console.error('Error deleting product:', error);
    }

    revalidatePath('/dashboard/products', 'page')
    redirect('/dashboard/products')
}