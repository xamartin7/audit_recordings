import { Link, useNavigate } from "react-router-dom"
import { FaHome, FaSignOutAlt, FaUserCircle } from "react-icons/fa"
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
                <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-800">
                    {/* Header with logo and user info */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xl font-bold">A</span>
                            </div>
                            <div className="font-semibold text-gray-900 dark:text-white">Audit Recordings</div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <FaUserCircle className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {user?.name} {user?.surname}
                                </p>
                                <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex-1 px-3 py-4 overflow-y-auto">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <Link to="/home" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <FaHome className="w-6 h-6" />
                                    <span className="ml-3">Home</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <button onClick={handleSignOut} className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <FaSignOutAlt className="w-6 h-6" />
                            <span className="ml-3">Log out</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}