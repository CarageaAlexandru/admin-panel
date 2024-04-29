'use server'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import supabase from "@/supabase/admin";
import {json} from "next/dist/client/components/react-dev-overlay/server/shared";
import {red} from "next/dist/lib/picocolors";

export async function inviteByEmail(formData) {
    const {email, name, role, isActive, phone, address} = {
        email: formData.get('email'),
        name: formData.get('name'),
        role: JSON.parse(formData.get('role')),
        isActive: JSON.parse(formData.get("isActive")),
        phone: formData.get('phone'),
        address: formData.get('address')
    };
    // const {data, error} = await supabase.auth.admin.inviteUserByEmail(email)
    const {error} = await supabase.from("users").insert({email, name, role, isActive, phone, address})

    console.log(error)
    // if (error) {
    //     redirect(`/dashboard/add/?message=${encodeURI(error.message)}`)
    //     return
    // }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}
