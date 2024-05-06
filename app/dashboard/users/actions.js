'use server'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import supabase from "@/supabase/admin";
import {createClient} from "@/supabase/server";
import {AddUserSchema} from "@/app/validations/add-user";

export async function inviteByEmail(prevState, formData) {
    const userDetails = {
        email: formData.get('email'),
        name: formData.get('name'),
        role: JSON.parse(formData.get('role')),
        isActive: JSON.parse(formData.get("isActive")),
        phone: parseInt(formData.get('phone'), 10),
        address: formData.get('address')
    };
    console.log(userDetails.phone)
    // const {data, error} = await supabase.auth.admin.inviteUserByEmail(email)
    const validatedFields = AddUserSchema.safeParse(userDetails)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const {data, error} = await supabase.from("users")
        .insert(userDetails)
        .select()

    if (error) {
        return {errors: error.message}
    }

    revalidatePath('/dashboard/users', 'page')
    redirect('/dashboard/users')
}

export async function deleteUserById(formData) {
    const supabase = createClient()
    const id = formData.get("id")
    const {error} = await supabase.from("users").delete().eq("id", id)

    if (error) {
        console.error('Error deleting users:', error);
    }

    revalidatePath('/dashboard/users', 'page')
    redirect('/dashboard/users')
}

export async function updateUserById(formData) {
    const {id, email, name, role, isActive, phone, address} = {
        id: formData.get("id"),
        email: formData.get('email'),
        name: formData.get('name'),
        role: JSON.parse(formData.get('role')),
        isActive: JSON.parse(formData.get("isActive")),
        phone: formData.get('phone'),
        address: formData.get('address')
    };

    const {error} = await supabase
        .from("users")
        .update({email, name, role, isActive, phone, address})
        .eq("id", id);

    console.log(error)
    // if (error) {
    //     redirect(`/dashboard/add/?message=${encodeURI(error.message)}`)
    //     return
    // }

    revalidatePath('/dashboard/users', 'page')
    redirect('/dashboard/users')
}