"use server"
import {createClient} from "@/supabase/server";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function signup(formData) {
    const supabase = createClient()

    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const {error} = await supabase.auth.signUp(data)

    if (error) {
        if (error) {
            redirect(`/register?message=${encodeURI(error.message)}`)
        }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}