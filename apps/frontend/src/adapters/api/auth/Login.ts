import { AuthSchema } from "api-types/src/AuthSchema";

export function login(email: string, password: string) {
    const validatedCredentials = AuthSchema.emailLogin.parse({ email, password });
    console.log('valdiated creadentials', validatedCredentials);
    return fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(validatedCredentials),
    })
}
