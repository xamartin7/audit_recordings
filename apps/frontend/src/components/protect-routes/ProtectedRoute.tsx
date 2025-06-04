import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";


export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth()
    return isAuthenticated ? children : <Navigate to="/login" />
}
