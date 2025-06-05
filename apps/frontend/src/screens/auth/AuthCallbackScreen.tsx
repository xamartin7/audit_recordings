import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { EnvConfig } from '../../utils/EnvConfig';
import { loginWithGoogle } from '../../adapters/api/auth/Login';
import { useAuth } from '../../hooks/auth/useAuth';
import { UserDTO } from 'shared/src/Auth.t';
import { AuthTokenBackendSchema, UserDTOBackendSchema } from 'api-types/src/AuthSchema';

const supabase = createClient(
    EnvConfig.getEnvVariables().supabaseUrl,
    EnvConfig.getEnvVariables().supabaseKey
);

export function AuthCallbackScreen() {
    const navigate = useNavigate();
    const { authenticate } = useAuth();

    useEffect(() => {
        // TODO Get the session access token and save it in the local storage, but before send it to the backend,
        // validate it and handle the user's session.


        supabase.auth.onAuthStateChange((event, session) => {
            loginWithGoogle(session?.access_token ?? '')
            .then(async (response) => {
                const data = await response.json();
                const userData = UserDTOBackendSchema.parse(data.user);
                const tokenData = AuthTokenBackendSchema.parse(data.authToken);
                const user: UserDTO = {
                    id: userData.id,
                    email: userData.email,
                    name: userData.name,
                    surname: userData.surname,
                    second_surname: userData.second_surname,
                    created_at: new Date(userData.created_at),
                    password: userData.password,
                }
                if (event === 'SIGNED_IN' && session) {
                    authenticate(user, tokenData.token);
                    navigate('/home');
                }
            })
            .catch((error) => {
                // TODO Handle error -> Navigate to error screen or show error compoent with a message
                console.error('Error en el login con Google', error);
            });
        });
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="text-white text-center">
                <h1 className="text-2xl font-bold mb-4">Completing sign in...</h1>
                <p>Please wait while we complete your sign in.</p>
            </div>
        </div>
    );
} 