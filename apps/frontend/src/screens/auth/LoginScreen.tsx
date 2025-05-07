import { AuthLayout } from '../../layouts/AuthLayout';
import { LoginForm } from '../../components/auth/LoginForm';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { Link } from 'react-router-dom';
export function LoginScreen() {
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    return (
        <AuthLayout>
            <h1 className="text-2xl font-bold text-center text-gray-900">Login</h1>
            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <LoginForm setError={setError} setSuccessMessage={setSuccessMessage}/>
            {/* TODO SSO google */}
            <hr className='my-4 border-gray-300'/>   
            <p className='text-center text-gray-500'>
                ¿No tienes una cuenta? <Link to='/signup' className='text-indigo-600'>Crear cuenta</Link>
            </p>
        </AuthLayout>
    );
}
