"use server"
import {createClient} from "@/supabase/server";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";


export async function signup(formData) {
    const messages = {
        alreadyRegistered: "This email is already registered, please login.",
        emailSent: "Please confirm email."
    }
    const supabase = createClient()
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const {data: {user}, error} = await supabase.auth.signUp({email: data.email, password: data.password})
    if (error) {
        redirect(`/register?message=${encodeURI(error.message)}`)
    }
    if (user.user_metadata.email_verified === false) {
        revalidatePath('/', 'layout')
        redirect(`/login?message=${encodeURI(messages.emailSent)}`)
    }
    if (user) {
        redirect(`/login?message=${encodeURI(messages.alreadyRegistered)}`)
    }
}