"use server"
import {createClient} from "@/supabase/server";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

const getURL = () => {
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'http://localhost:3000/login'
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}/login`
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
    return url
}

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
    console.log(getURL())
    const {data: {user}, error} = await supabase.auth.signUp({
        email: data.email,
        password: data.password, options: {
            emailRedirectTo: getURL()
        }
    })

    if (error) {
        redirect(`/register?message=${encodeURI(error.message)}`)
    }
    if (user) {
        redirect(`/login?message=${encodeURI(messages.alreadyRegistered)}`)
    }

    if (user.user_metadata.email_verified === false) {
        revalidatePath('/', 'layout')
        redirect(`/login?message=${encodeURI(messages.emailSent)}`)
    }
}