import { AuthSchema } from "api-types/src/AuthSchema";

export function login(email: string, password: string) {
    const validatedCredentials = AuthSchema.emailLogin.parse({ email, password });
    return fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        body: JSON.stringify(validatedCredentials),
    })
}
