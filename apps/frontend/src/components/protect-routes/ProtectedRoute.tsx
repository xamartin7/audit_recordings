import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="text-white text-center">
                    <h1 className="text-2xl font-bold mb-4">Loading...</h1>
                    <p>Please wait while we verify your authentication.</p>
                </div>
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
}
