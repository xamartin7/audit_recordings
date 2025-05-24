import { AuthLayout } from "../../layouts/AuthLayout";
import { SignupForm } from "../../components/auth/SignupForm";
import { Link } from "react-router-dom";
import { JSX, useState } from "react";
import { Alert } from "@mui/material";
export function SignupScreen() {
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<JSX.Element | null>(null);

    return (
        <AuthLayout>
            <h1 className="text-2xl font-bold text-center text-gray-900">Signup</h1>
            {error && <Alert severity="error">{error}</Alert>}
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            <SignupForm setError={setError} setSuccessMessage={setSuccessMessage} />
            <hr className='my-4 border-gray-300'/>   
            <p className='text-center text-gray-500'>
                ¿Ya tienes una cuenta? <Link to='/login' className='text-indigo-600'>Iniciar sesión</Link>
            </p>
        </AuthLayout>
    );
}
