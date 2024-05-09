"use client"
import React from "react";
import {useFormState} from "react-dom"
import Toast from "@/app/ui/toast/toast";
import Submit from "@/app/ui/forms/Submit";
import Link from "next/link";

export function ProductForm({action, product}) {
    const [state, formAction] = useFormState(action, product || undefined)
    return (
        <div className="bg-blue">
            <form action={formAction}>
                {/*place the product id as hidden so it will persist if the validation fails and prevState gets overiden*/}
                <input type="hidden" name="id" value={product ? product.id : undefined}/>
                <div className="mb-4 flex gap-2">
                    <input type="text" placeholder="Title" required={true} name="title"
                           className="input input-bordered input-accent w-full max-w-xs"
                           defaultValue={product ? product.title : ""}
                    />
                    <input type="text" placeholder="Color" required={true} name="color"
                           className="input input-bordered input-accent w-full max-w-xs"
                           defaultValue={product ? product.color : ""}
                    />
                </div>
                <div className="mb-4 flex gap-2">
                    <select className="select select-accent w-full max-w-xs" name="category" id="category"
                            defaultValue={product ? product.category : "general"}>
                        <option disabled value="general">Select a category</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="phone">Phone</option>
                        <option value="computer">Computer</option>
                    </select>
                    <select className="select select-accent w-full max-w-xs" name="size" id="size"
                            defaultValue={product ? product.category : "general"}>
                        <option disabled value="general">Select size</option>
                        <option value="s">Small</option>
                        <option value="m">Medium</option>
                        <option value="l">Large</option>
                        <option value="xl">X-Large</option>
                    </select>
                </div>
                <div className="mb-4 flex gap-2">
                    <input type="number" placeholder="Price" required={true} name="price"
                           className="input input-bordered input-accent w-full max-w-xs"
                           defaultValue={product ? product.price : ""}
                    />
                    <input type="number" placeholder="Stock" required={true} name="stock"
                           className="input input-bordered input-accent w-full max-w-xs"
                           defaultValue={product ? product.stock : ""}
                    />
                </div>
                <textarea className="textarea textarea-accent flex-grow w-full mb-2" placeholder="Description"
                          rows="10"
                          id="description"
                          name="description"
                          defaultValue={product ? product.description : ""}
                ></textarea>

                <div className="flex  justify-between items-center">
                    <Submit/>
                    <Link href="/dashboard/products">
                        <button className="btn btn-primary">Back</button>
                    </Link>
                </div>
            </form>
            {/*field is the input error coming from and message the error message*/}
            {state && state.errors && Object.entries(state.errors).map(([field, message]) => (
                <Toast key={`${field}-${message}`} message={message} field={field}/>
            ))}
        </div>
    )
}