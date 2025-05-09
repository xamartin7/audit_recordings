
// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'
import { EnvConfig } from '../../utils/EnvConfig';

const supabase = createClient(
  EnvConfig.getEnvVariables().supabaseUrl,
  EnvConfig.getEnvVariables().supabaseKey
)

export function SSOGoogleButton() {

    function handleLogin() {
        supabase.auth.signInWithOAuth({
            provider: 'google',
            /*options: {
                redirectTo: 'http://localhost:3000/auth/callback',
            },*/
        })
    }

    return (
        <button className="bg-red-500" onClick={handleLogin}>
            Login with Google
        </button>
    );
}
