"use client"
import {createClient} from "@/supabase/client";

export default function Home() {
  const supabase = createClient()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello</h1>
    </main>
  );
}
