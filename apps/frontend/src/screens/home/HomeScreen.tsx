import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { EnvConfig } from '../../utils/EnvConfig';
import { Button } from '@mui/material';
import { useAuth } from '../../hooks/auth/useAuth';

const supabase = createClient(
    EnvConfig.getEnvVariables().supabaseUrl,
    EnvConfig.getEnvVariables().supabaseKey
);

export function HomeScreen() {
    const [active, setActive] = useState('home');
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleSignOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error signing out:', error.message);
            } else {
                logout();
                navigate('/login');
            }
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4 text-center text-2xl font-bold text-gray-900">Dashboard</div>
                <ul>
                    <li className={`p-4 ${active === 'home' ? 'bg-gray-200' : ''}`} onClick={() => setActive('home')}>
                        <Link to="/home">Home</Link>
                    </li>
                    <li className={`p-4 ${active === 'settings' ? 'bg-gray-200' : ''}`} onClick={() => setActive('settings')}>
                        <Link to="/settings">Settings</Link>
                    </li>
                </ul>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Top navigation */}
                <div className="bg-white shadow-md p-4 flex justify-between items-center">
                    <div className="text-xl font-bold text-gray-900">{active.charAt(0).toUpperCase() + active.slice(1)}</div>
                    <div className="flex items-center gap-4">
                        <div className="text-gray-500">Welcome, {user?.name}</div>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Button>
                    </div>
                </div>

                {/* Content area */}
                <div className="flex-1 p-6">
                    <h2 className="text-2xl font-bold text-gray-900">{active.charAt(0).toUpperCase() + active.slice(1)} Page</h2>
                    <p className="text-gray-500">This is the {active} page content.</p>
                </div>
            </div>
        </div>
    );
}
