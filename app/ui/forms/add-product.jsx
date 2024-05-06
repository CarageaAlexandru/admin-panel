"use client"

import {addProduct} from "@/app/dashboard/products/actions";
import React from "react";
import {useFormState} from "react-dom"
import Toast from "@/app/ui/toast/toast";
import {log} from "next/dist/server/typescript/utils";

export function AddProductForm() {
    const [state, formAction] = useFormState(addProduct, undefined)
    return (
        <div className="flex flex-col max-w-screen-lg">
            <form action={formAction} className="flex flex-wrap gap-6 justify-center p-10 shadow-lg rounded-lg">
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
                <select className="select select-accent w-full max-w-xs" name="size" id="size"
                        defaultValue={"general"}>
                    <option disabled value="general">Select size</option>
                    <option value="s">Small</option>
                    <option value="m">Medium</option>
                    <option value="l">Large</option>
                    <option value="xl">X-Large</option>
                </select>
                <textarea className="textarea textarea-accent flex-grow w-full" placeholder="Description" rows="16"
                          id="description"
                          name="description"
                ></textarea>
                <button className="btn btn-accent" type="submit">Submit</button>
            </form>
            {/*field is the input error coming from and message the error message*/}
            {state && state.errors && Object.entries(state.errors).map(([field, message]) => (
                <Toast key={`${field}-${message}`} message={message} field={field}/>
            ))}
        </div>
    )
}