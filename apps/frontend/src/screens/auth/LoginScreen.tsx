import { AuthLayout } from '../../layouts/AuthLayout';
import { LoginForm } from '../../components/LoginForm';
import { useState } from 'react';

export function LoginScreen() {
    const [error, setError] = useState<string>('');
    return (
        <AuthLayout>
            <h1 className="text-2xl font-bold text-center text-gray-900">Login</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <LoginForm setError={setError}/>
        </AuthLayout>
    );
}
