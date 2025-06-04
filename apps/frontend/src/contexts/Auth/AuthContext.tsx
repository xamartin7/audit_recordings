import { createContext, useEffect, useState } from "react";
import { UserDTO } from "shared/src/Auth.t";

type AuthContextType = {
    user: UserDTO | null;
    authToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    authenticate: (user: UserDTO, authToken: string) => Promise<void>;
    logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    authToken: null,
    isAuthenticated: false,
    isLoading: true,
    authenticate: async () => {},
    logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserDTO | null>(null);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load auth state from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedAuthToken = localStorage.getItem("authToken");

        if (storedUser && storedAuthToken) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setAuthToken(storedAuthToken);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Error parsing stored user data:", error);
                // Clear invalid data
                localStorage.removeItem("user");
                localStorage.removeItem("authToken");
                setIsAuthenticated(false);
            }
        }
        setIsLoading(false);
    }, []);

    // Sync auth state with localStorage
    useEffect(() => {
        if (user && authToken) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("authToken", authToken);
        } else {
            localStorage.removeItem("user");
            localStorage.removeItem("authToken");
        }
    }, [user, authToken]);

    const authenticate = async (user: UserDTO, authToken: string) => {
        setUser(user);
        setAuthToken(authToken);
        setIsAuthenticated(true);
    };

    const logout = async () => {
        setUser(null);
        setAuthToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
        localStorage.removeItem("authToken");
    };

    const value = {
        user,
        authToken,
        isAuthenticated,
        isLoading,
        authenticate,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};