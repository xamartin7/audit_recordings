import { Link, useNavigate } from "react-router-dom"
import { FaHome, FaSignOutAlt } from "react-icons/fa"
import { useAuth } from "../../hooks/auth/useAuth"
import { EnvConfig } from "../../utils/EnvConfig"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
    EnvConfig.getEnvVariables().supabaseUrl,
    EnvConfig.getEnvVariables().supabaseKey
);

export const Sidebar = () => {
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
        <>
            {/* TODO Is not working */}
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
            </button>

            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {/* LINKS */}
                        <li>
                            <Link to="/home" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <FaHome className="w-6 h-6" />
                                <span className="ml-3">Home</span>
                            </Link>
                        </li>
                    </ul>

                    <ul className="fixed bottom-0 space-y-2 font-medium mb-4 w-56">
                        <li>
                            <button onClick={handleSignOut} className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <FaSignOutAlt className="w-6 h-6" />
                                <span className="ml-3">Log out</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}