'use server'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import supabase from "@/supabase/admin";
import {createClient} from "@/supabase/server";
import {AddUserSchema} from "@/app/validations/add-user";
import {UpdateUserSchema} from "@/app/validations/update-user";

export async function inviteByEmail(prevState, formData) {
    const userDetails = {
        email: formData.get('email'),
        name: formData.get('name'),
        admin: JSON.parse(formData.get('admin')),
        isActive: JSON.parse(formData.get("isActive")),
        phone: parseInt(formData.get('phone'), 10),
        address: formData.get('address')
    };
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

export async function updateUserById(prevState, formData) {
    const userDetails = {
        id: formData.get("id"),
        email: formData.get('email'),
        name: formData.get('name'),
        admin: JSON.parse(formData.get('admin')),
        isActive: JSON.parse(formData.get("isActive")),
        phone: parseInt(formData.get('phone'), 10),
        address: formData.get('address')
    };
    // prevState may get emptied if re-render or validation occurs
    const validatedFields = UpdateUserSchema.safeParse(
        userDetails
    )

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }
    const {error} = await supabase
        .from("users")
        .update(userDetails)
        .eq("id", userDetails.id);

    if (error) {
        console.log(error)
        return {errors: {database: error.message}};
    }

    revalidatePath('/dashboard/users', 'page')
    redirect('/dashboard/users')
}