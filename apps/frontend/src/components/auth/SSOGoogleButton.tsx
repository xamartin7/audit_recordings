
// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'
import { EnvConfig } from '../../utils/EnvConfig';
import { Button } from '@mui/material';
import { FaGoogle } from "react-icons/fa";
import { useEffect } from 'react';

const supabase = createClient(
  EnvConfig.getEnvVariables().supabaseUrl,
  EnvConfig.getEnvVariables().supabaseKey
)

export function SSOGoogleButton() {

    useEffect(() => {
        // Watch for auth state changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth state change:', event)
            if (session) {
                console.log('Session is ready:', session)
                //setAccessToken(session.access_token) // <-- this is your backend token
            }
        })

        // Initial fetch after hydration
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                // setAccessToken(session.access_token)
                console.log('Initial session restored:', session)
            } else {
                console.log('No session on initial load')
            }
        })

        return () => subscription.unsubscribe()
    }, [])

    function handleLogin(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        supabase.auth.signInWithOAuth({
            provider: 'google',
            /*options: {
                //redirectTo: 'http://localhost:3000/auth/callback',
                redirectTo: window.location.origin,
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
