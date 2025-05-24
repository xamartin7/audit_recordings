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

    async function handleLogin(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                }
            })
            
            if (error) {
                console.error('Error signing in with Google:', error.message)
            }
            console.log('Google sign in successful:', data)
        } catch (error) {
            console.error('Error during Google sign in:', error)
        }
    }

    return (
        <Button
            onClick={handleLogin}
            className="w-full"
            variant="outlined"
            color="primary"
        >
            <FaGoogle className="mr-2" />
            Google
        </Button>
    );
}
