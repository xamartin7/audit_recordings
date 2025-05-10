import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { EnvConfig } from '../../utils/EnvConfig';

const supabase = createClient(
    EnvConfig.getEnvVariables().supabaseUrl,
    EnvConfig.getEnvVariables().supabaseKey
);

export function AuthCallbackScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                navigate('/home');
            }
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