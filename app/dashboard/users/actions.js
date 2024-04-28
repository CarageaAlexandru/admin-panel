'use server'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import supabase from "@/supabase/admin";

export async function inviteByEmail(formData) {
    const {email, name, role, phone, address} = {
        email: formData.get('email'),
        name: formData.get('name'),
        role: formData.get('role'),
        phone: formData.get('phone'),
        address: formData.get('address')
    };
    let {data, error} = await supabase.auth.admin.inviteUserByEmail(email)

    console.log(error)
    console.log(data)

    // if (error) {
    //     redirect(`/dashboard/add/?message=${encodeURI(error.message)}`)
    //     return
    // }

    revalidatePath('/dashboard/users/add', 'layout')
    redirect('/dashboard')
}

