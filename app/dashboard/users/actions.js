'use server'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {createClient} from "@/supabase/server";

export async function inviteByEmail(formData) {
    const supabase = createClient()

    const {email, name, role, phone, address} = {
        email: formData.get('email'),
        name: formData.get('name'),
        role: formData.get('role'),
        phone: formData.get('phone'),
        address: formData.get('address')
    };
    let {data, error} = await supabase.auth.admin.inviteUserByEmail('someone@email.com')

    console.log(error)
    // if (error) {
    //     redirect(`/dashboard/add/?message=${encodeURI(error.message)}`)
    //     return
    // }

    revalidatePath('/dashboard/users/add', 'layout')
    redirect('/dashboard')
}

