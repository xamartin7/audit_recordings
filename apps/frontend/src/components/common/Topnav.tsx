import { Button } from "@mui/material"
import { createClient } from "@supabase/supabase-js";
import { EnvConfig } from "../../utils/EnvConfig";
import { useAuth } from "../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
    EnvConfig.getEnvVariables().supabaseUrl,
    EnvConfig.getEnvVariables().supabaseKey
);

export const Topnav: React.FC<{active: string}> = ({active}) => {
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
        <div className="bg-white shadow-md p-3 flex justify-between items-center">
            <div className="text-xl font-bold text-gray-900">{active.charAt(0).toUpperCase() + active.slice(1)}</div>
            <div className="flex items-center gap-4">
                <div className="text-gray-500">Welcome, {user?.name} {user?.surname}</div>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSignOut}
                >
                    Sign Out
                </Button>
            </div>
        </div>
    )
}