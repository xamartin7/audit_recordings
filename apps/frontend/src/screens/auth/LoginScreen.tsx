import { AuthLayout } from '../../layouts/AuthLayout';
import { LoginForm } from '../../components/LoginForm';

export function LoginScreen() {
    return (
        <AuthLayout>
            <h1 className="text-2xl font-bold text-center text-gray-900">Login</h1>
            <LoginForm />
        </AuthLayout>
    );
}
