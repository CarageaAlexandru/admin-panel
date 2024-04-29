import {NextResponse} from 'next/server'
import {createClient} from "@/supabase/server";
import {red} from "next/dist/lib/picocolors";

export async function GET(request) {
    const {searchParams} = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type')
    const next = searchParams.get('next') || "/"

    const redirectTo = request.nextUrl.clone()
    redirectTo.pathname = next
    redirectTo.searchParams.delete('token_hash')
    redirectTo.searchParams.delete('type')
    console.log(redirectTo)
    if (token_hash && type) {
        const supabase = createClient()
        const {error} = await supabase.auth.verifyOtp({
            type,
            token_hash,
        })
        if (!error) {
            // Render a form for the user to set their password
            // You need to implement this part based on your application's structure
            return NextResponse.redirect(redirectTo)
        }
    }

    // Redirect the user to an error page
    return NextResponse.redirect('/error')
}