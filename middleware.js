import {NextResponse} from "next/server";
import {createClient} from "@/supabase/middleware";

export async function middleware(request) {
    const {supabase, response} = createClient(request)
    const {
        data: {user},
    } = await supabase.auth.getUser();
    if (!user && !request.nextUrl.pathname.startsWith("/login") && !request.nextUrl.pathname.startsWith("/register") && !request.nextUrl.pathname.startsWith("/auth/confirm")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    return response
}


export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}