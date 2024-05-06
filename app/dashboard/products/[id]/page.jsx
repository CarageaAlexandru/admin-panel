import React from 'react';
import Link from "next/link";
import Image from 'next/image'; // Assuming you might want to add an image
import {redirect} from "next/navigation";
import {createClient} from "@/supabase/server";
import {fetchProductById} from "@/app/lib/data";
import {updateProductById} from "@/app/dashboard/products/actions";


export default async function SingleProductPage({params}) {
    const supabase = createClient()
    const {id} = params
    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const product = await fetchProductById(id)
    return (
        <div className="flex items-start justify-center p-5">
            <div className="flex flex-col items-center justify-center">
                {/* Optional: Product Image */}
                <div>
                    <Image src="/avatar_placeholder.png" alt="Product Image" width={300} height={300}/>
                </div>
            </div>

            <div className="flex-1 max-w-lg px-6">
                <form action={updateProductById}>
                    <input type="hidden" id="id" value={product.id} name="id"/>
                    <div className="flex justify-between">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Title:</label>
                            <input type="text" defaultValue={product.title}
                                   className="input input-bordered input-accent w-full"
                                   name="title"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Color:</label>
                            <input type="text" defaultValue={product.color}
                                   className="input input-bordered input-accent w-full"
                                   name="color"/>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select defaultValue={product.category} className="select select-accent" name="category">
                                <option value="kitchen">Kitchen</option>
                                <option value="phone">Phone</option>
                                <option value="computer">Computer</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Size</label>
                            <select defaultValue={product.size} className="select select-accent" name="size">
                                <option value="s">Small</option>
                                <option value="m">Medium</option>
                                <option value="l">Large</option>
                                <option value="xl">X-Large</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Price:</label>
                            <input type="number" defaultValue={product.price}
                                   className="input input-bordered input-accent w-full"
                                   name="price"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Stock:</label>
                            <input type="number" defaultValue={product.stock}
                                   className="input input-bordered input-accent w-full"
                                   name="stock"/>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Description:</label>
                        <textarea className="textarea textarea-bordered textarea-accent w-full"
                                  defaultValue={product.description}
                                  name="description"
                                  rows={3}></textarea>
                    </div>
                    <div className="flex justify-between items-center">
                        <button className="btn btn-accent">Update</button>
                        <Link href="/dashboard/products">
                            <button className="btn btn-primary">Back to List</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
