import { AuthSchema } from "api-types/src/AuthSchema";
import { ZodError } from 'zod';

export function login(email: string, password: string) {
    try {
        const validatedCredentials = AuthSchema.emailLogin.parse({ email, password });
        return fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validatedCredentials),
        })
    } catch (error) {
        if (error instanceof ZodError) {
            console.error('Validation error:', error.errors);
            return Promise.reject({ type: 'validation', errors: error.errors });
        }
        console.error('Error en el login', error);
        return Promise.reject({ type: 'server', message: 'Error en el servidor' });
    }
}

export function loginWithGoogle(token: string) {
    try {
        const validatedToken = AuthSchema.googleLogin.parse({ token });
        return fetch('http://localhost:3000/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validatedToken)
        })
    } catch (error) {
        console.error('Error en el login con Google', error);
        return Promise.reject({ type: 'server', message: 'Error en el servidor' });
    }
}