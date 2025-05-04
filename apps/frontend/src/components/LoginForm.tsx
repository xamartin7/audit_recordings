import React from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../adapters/api/auth/Login';
interface LoginFormData {
    email: string;
    password: string;
}

export const LoginForm: React.FC<{ setError: (error: string) => void }> = ({ setError }) => {
    const { register, handleSubmit } = useForm<LoginFormData>();

    const onSubmit = (data: LoginFormData) => {
        setError('');
        login(data.email, data.password)
        .then(async (response) => {
            const data = await response.json();
            console.log(data);
            if (response.status === 200) {
                console.log('Login successful');
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
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Login
                </button>
            </div>
        </form>
    );
}; 