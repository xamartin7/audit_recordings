
// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'
import { EnvConfig } from '../../utils/EnvConfig';
import { Button } from '@mui/material';
import { FaGoogle } from "react-icons/fa";

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
        <Button
            onClick={handleLogin}
            className="w-full"
            variant="outlined"
            color="primary">
                <FaGoogle className="mr-2" />
                Google
            </Button>
    );
}
