'use server'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {createClient} from "@/supabase/server";
import {UpdateUserSchema} from "@/app/validations/update-user";


export async function addProduct(prevState, formData) {
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

    const validatedFields = UpdateUserSchema.safeParse(
        product
    )

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const {data, error} = await supabase
        .from('products')
        .insert(product)
        .select()

    if (error) {
        return {errors: error.message}
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

export async function updateProductById(formData) {
    const supabase = createClient()
    const {id, title, category, price, stock, color, size, description} = {
        id: formData.get("id"),
        title: formData.get('title'),
        category: formData.get('category'),
        price: JSON.parse(formData.get('price')),
        stock: JSON.parse(formData.get("stock")),
        color: formData.get('color'),
        size: formData.get('size'),
        description: formData.get('description')
    };

    const {error} = await supabase
        .from("products")
        .update({title, category, price, stock, color, size, description})
        .eq("id", id);

    if (error) {
        console.error('Error inserting product:', error);
        if (error) {
            redirect(`/dashboard/products/add?message=${encodeURI(error.message)}`)
        }
    }

    revalidatePath('/dashboard/products', 'page')
    redirect('/dashboard/products')
}