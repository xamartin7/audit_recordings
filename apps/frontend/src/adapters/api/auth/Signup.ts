import { AuthSchema } from "api-types/src/AuthSchema";
import { ZodError } from 'zod';

export function signup(email: string, password: string, repeatPassword: string, name: string, surname: string, secondSurname: string) {
    try {
        const validatedCredentials = AuthSchema.signup.parse({ email, password, repeatPassword, name, surname, secondSurname });
        return fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(validatedCredentials),
        });
    } catch (error) {
        if (error instanceof ZodError) {
            console.error('Validation error:', error.errors);
            return Promise.reject({ type: 'validation', errors: error.errors });
        }
        console.error('Error en el signup', error);
        return Promise.reject({ type: 'server', message: 'Error en el servidor' });
    }
}

