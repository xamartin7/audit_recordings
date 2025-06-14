import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../../adapters/api/auth/Login';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuth } from '../../hooks/auth/useAuth';
import { UserDTO } from 'shared/src/Auth.t';
import { AuthTokenBackendSchema, UserDTOBackendSchema } from 'api-types/src/AuthSchema';

interface LoginFormData {
    email: string;
    password: string;
}

export const LoginForm: React.FC<{ setError: (error: string) => void, setSuccessMessage: (message: string) => void }> = ({ setError, setSuccessMessage }) => {
    const { register, handleSubmit } = useForm<LoginFormData>();
    const navigate = useNavigate();
    const { authenticate } = useAuth()
    const [isPending, setIsPending] = useState(false);

    const onSubmit = (data: LoginFormData) => {
        setError('');
        setIsPending(true);
        login(data.email, data.password)
        .then(async (response) => {
            const data = await response.json();
            if (response.status === 200) {
                const userData = UserDTOBackendSchema.parse(data.user);
                const user: UserDTO = {
                    id: userData.id,
                    email: userData.email,
                    name: userData.name,
                    surname: userData.surname,
                    second_surname: userData.second_surname,
                    created_at: new Date(userData.created_at),
                    password: userData.password,
                }
                const authTokenData = AuthTokenBackendSchema.parse(data.authToken);
                setSuccessMessage('Sesión iniciada correctamente');
                authenticate(user, authTokenData.token);
                navigate('/home');
            } else {
                setError(data.message);
            }
        })
        .catch((error) => {
            if (error.type === 'validation') {
                setError((error.errors as { message: string }[]).map(e => e.message).join(', '));
            } else {
                console.error(error);
                setError('Error en el servidor');
            }
        })
        .finally(() => {
            setIsPending(false);
        });
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" required {...register('email')} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" id="password" {...register('password')} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full"
                    disabled={isPending}
                    loading={isPending}
                >
                    Login
                </Button>
            </div>
        </form>
    );
}; 