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
        </AuthLayout>
    );
}
