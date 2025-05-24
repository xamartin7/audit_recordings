import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../../adapters/api/auth/Login';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
interface LoginFormData {
    email: string;
    password: string;
}

export const LoginForm: React.FC<{ setError: (error: string) => void, setSuccessMessage: (message: string) => void }> = ({ setError, setSuccessMessage }) => {
    const { register, handleSubmit } = useForm<LoginFormData>();
    const [isPending, startTransition] = useTransition();
    const navigate = useNavigate();

    const onSubmit = (data: LoginFormData) => {
        setError('');
        startTransition(() => {
            login(data.email, data.password)
            .then(async (response) => {
                const data = await response.json();
            console.log(data);
            if (response.status === 200) {
                setSuccessMessage('Sesión iniciada correctamente');
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
            });
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
                    loading={isPending}
                    loadingPosition="start"
                    className="w-full"
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Login
                </Button>
            </div>
        </form>
    );
}; 