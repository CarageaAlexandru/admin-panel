'use server'
import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'
import {createClient} from "@/supabase/server";
import LoginSchema from "@/app/validations/login";

export async function login(prevState, formData) {
    const supabase = createClient()

    const userDetails = {
        email: formData.get('email'),
        password: formData.get('password'),
    }
    const validatedFields = LoginSchema.safeParse(userDetails)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const {error} = await supabase.auth.signInWithPassword(userDetails)
    if (error) {
        console.log(error)
        return {errors: {auth: error.message}};
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function logout() {
    const supabase = createClient()

    const {error} = await supabase.auth.signOut();
    if (error) {
        console.error("Error during sign out:", error);
        return {errors: {auth: error.message}};
    }

    revalidatePath('/', 'layout')
    redirect('/login')
}