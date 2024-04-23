import React from 'react';
import {redirect} from "next/navigation";
import {createClient} from "@/supabase/server";

const supabase = createClient()
export default async function AddProductPage() {
    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <form action="" className="flex flex-wrap gap-6 justify-center p-10 shadow-lg rounded-lg">
                <input type="text" placeholder="Title" required={true} name="title"
                       className="input input-bordered input-accent w-full max-w-xs"/>
                <select className="select select-accent w-full max-w-xs" name="category" id="category"
                        defaultValue={"general"}>
                    <option disabled value="general">Select a category</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="phone">Phone</option>
                    <option value="computer">Computer</option>
                </select>
                <input type="number" placeholder="Price" required={true} name="price"
                       className="input input-bordered input-accent w-full max-w-xs"/>
                <input type="number" placeholder="Stock" required={true} name="stock"
                       className="input input-bordered input-accent w-full max-w-xs"/>
                <input type="text" placeholder="Color" required={true} name="color"
                       className="input input-bordered input-accent w-full max-w-xs"/>
                <input type="text" placeholder="Size" required={true} name="size"
                       className="input input-bordered input-accent w-full max-w-xs"/>
                <textarea className="textarea textarea-accent flex-grow w-full" placeholder="Description" rows="16"
                          id="description"
                          name="description"
                ></textarea>
                <button className="btn btn-accent">Submit</button>
            </form>
        </div>

    );
};
