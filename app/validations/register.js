import {z} from 'zod';

const RegisterSchema = z.object({
    email: z.string().min(1, {message: "Please enter your email."}).email(),
    password: z.string().min(6, {message: "Password is too short."}),
});

export default RegisterSchema;