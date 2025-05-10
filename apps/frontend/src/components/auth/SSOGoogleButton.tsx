// src/supabaseClient.ts
import { createClient, Session } from '@supabase/supabase-js'
import { EnvConfig } from '../../utils/EnvConfig';
import { Button } from '@mui/material';
import { FaGoogle } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const supabase = createClient(
  EnvConfig.getEnvVariables().supabaseUrl,
  EnvConfig.getEnvVariables().supabaseKey
)

export function SSOGoogleButton() {
    const [session, setSession] = useState<Session | null>(null)
    const navigate = useNavigate();

    /*useEffect(() => {
        // Initial fetch after hydration
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                console.log('Initial session restored:', session)
                setSession(session)
                navigate('/home')
            } else {
                console.log('No session on initial load')
            }
        })

        // Watch for auth state changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth state change:', event)
            console.log('Session is ready:', session)
            if (session) {
                setSession(session)
                navigate('/home')
            }
        })

        return () => subscription.unsubscribe()
    }, [navigate])*/

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
        } catch (error) {
            console.error('Error during Google sign in:', error)
        }
    }

    if (!session) {
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
    } else {
        return (
            <Button
                onClick={() => supabase.auth.signOut()}
                className="w-full"
                variant="outlined"
                color="primary"
            >
                <FaGoogle className="mr-2" />
                Sign Out
            </Button>
        );
    }
}
