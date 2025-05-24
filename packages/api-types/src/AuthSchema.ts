import { z } from "zod";

export const AuthSchema = {
    emailLogin: z.object({
        email: z.string().email({ message: 'El email no es válido' }),
        password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 carácteres' }),
    }),
    googleLogin: z.object({
        token: z.string(),
    }),
    signup: z.object({
        email: z.string().email(),
        password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
        repeatPassword: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
        name: z.string().min(1, { message: 'El nombre debe tener al menos 1 caracter' }),
        surname: z.string().min(1, { message: 'El apellido debe tener al menos 1 caracter' }),
        secondSurname: z.string(),
    }),
}

export type AuthSchema = z.infer<typeof AuthSchema.emailLogin> | z.infer<typeof AuthSchema.googleLogin>;
