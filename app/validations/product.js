import {z} from "zod"

export const ProductSchema = z.object({
    title: z.string()
        .min(1, {message: "Title is required."})
        .max(50, {message: "Title must not exceed 50 characters."}),
    category: z.string()
        .min(1, {message: "Category is required."}),
    price: z.number()
        .min(1, {message: "Price must be at least $1."}),
    stock: z.number()
        .min(1, {message: "Stock must be at least 1 item."}),
    color: z.string()
        .min(1, {message: "Color is required."}),
    size: z.string()
        .min(1, {message: "Size is required."}),
    description: z.string()
        .min(1, {message: "Description is required."})
        .max(300, {message: "Description must be less than 300 characters."}),
});