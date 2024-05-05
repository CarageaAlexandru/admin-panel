'use server'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {createClient} from "@/supabase/server";

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

    const {data, error} = await supabase
        .from('products')
        .insert(product)

    if (error) {
        console.error('Error inserting product:', error);
        if (error) {
            redirect(`/dashboard/products/add?message=${encodeURI(error.message)}`)
        }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}