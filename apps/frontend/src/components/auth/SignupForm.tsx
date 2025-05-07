import { useForm } from "react-hook-form";
import { SignupData } from "shared/src/Auth.t";
import { signup } from "../../adapters/api/auth/Signup";
import { Link } from "react-router-dom";
import { JSX } from "react";

interface SignupFormProps {
    setError: (error: string) => void;
    setSuccessMessage: (successMessage: JSX.Element) => void;
}

export function SignupForm({ setError, setSuccessMessage }: SignupFormProps) {
    const { register, handleSubmit } = useForm<SignupData>();

    const onSubmit = (data: SignupData) => {
        setError('')
        if (data.password !== data.repeatPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        signup(data.email, data.password, data.repeatPassword, data.name, data.surname, data.secondSurname)
        .then(async (response) => {
            const data = await response.json();
            console.log(data);
            setSuccessMessage(
                <p>
                    Usuario creado correctamente.{' '}
                    <Link to="/login" className="text-indigo-600 underline">
                        Inicia sesión
                    </Link>
                </p>
            );
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
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input type="password" id="password" {...register('password')} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="repeatPassword" className="block text-sm font-medium text-gray-700">Confirma contraseña</label>
                <input type="password" id="repeatPassword" {...register('repeatPassword')} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" id="name" {...register('name')} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="surname" className="block text-sm font-medium text-gray-700">Primer apellido</label>
                <input type="text" id="surname" {...register('surname')} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label htmlFor="secondSurname" className="block text-sm font-medium text-gray-700">Segundo apellido</label>
                <input type="text" id="secondSurname" {...register('secondSurname')} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Crear cuenta
                </button>
            </div>
        </form>
    );
}
