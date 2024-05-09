import {z} from "zod"

export const AddUserSchema = z.object({
    name: z.string()
        .min(1, {message: "Name is required."})
        .max(50, {message: "Name must not exceed 50 characters."}),
    email: z.string()
        .min(1, {message: "Email is required."})
        .email("Please enter a valid email"),
    phone: z.number()
        .min(1, {message: "Please enter a valid phone number."}),
    address: z.string()
        .min(1, {message: "Address is required."})
        .max(300, {message: "Address is too long."}),
    admin: z.boolean(),
    isActive: z.boolean()
});