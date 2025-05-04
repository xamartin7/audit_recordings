import { AuthLayout } from '../../layouts/AuthLayout';
import { LoginForm } from '../../components/LoginForm';
import { useState } from 'react';
import { Alert } from '@mui/material';
export function LoginScreen() {
    const [error, setError] = useState<string>('');
    return (
        <AuthLayout>
            <h1 className="text-2xl font-bold text-center text-gray-900">Login</h1>
            {error && <Alert severity="error">{error}</Alert>}
            <LoginForm setError={setError}/>
            {/* TODO SSO google */}
            <hr className='my-4 border-gray-300'/>   
            <p className='text-center text-gray-500'>¿No tienes una cuenta? <a href='#' className='text-indigo-600'>Crear cuenta</a></p>
        </AuthLayout>
    );
}
