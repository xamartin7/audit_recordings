import { z } from "zod";

export const AuthSchema = {
    emailLogin: z.object({
        email: z.string().email(),
        password: z.string().min(8),
    }),
    googleLogin: z.object({
        token: z.string(),
    }),
}

export type AuthSchema = z.infer<typeof AuthSchema.emailLogin> | z.infer<typeof AuthSchema.googleLogin>;
