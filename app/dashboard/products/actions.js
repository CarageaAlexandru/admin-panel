'use server'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {createClient} from "@/supabase/server";
import {ProductSchema} from "@/app/validations/product";


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

    const validatedFields = ProductSchema.safeParse(
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

export async function updateProductById(prevState, formData) {
    const supabase = createClient()
    const updatedProduct = {
        id: formData.get('id'),
        title: formData.get('title'),
        category: formData.get('category'),
        price: JSON.parse(formData.get('price')),
        stock: JSON.parse(formData.get("stock")),
        color: formData.get('color'),
        size: formData.get('size'),
        description: formData.get('description')
    };

    // object containing prev values ( including id )
    // console.log(prevState, "{REV")
    // // new values from updating
    // console.log(formData, "data")

    const validatedFields = ProductSchema.safeParse(
        updatedProduct
    )

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const {error} = await supabase
        .from("products")
        .update(updatedProduct)
        .eq("id", updatedProduct.id);
    //
    if (error) {
        console.log(error)
        return {errors: {database: error.message}};
    }

    revalidatePath('/dashboard/products', 'page')
    redirect('/dashboard/products')
}