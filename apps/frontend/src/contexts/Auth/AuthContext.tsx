import { createContext, useState } from "react";
import { UserDTO } from "shared/src/Auth.t";

type AuthContextType = {
    user: UserDTO | null
    isAuthenticated: boolean
    authenticate: (user: UserDTO) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    authenticate: async () => {},
    logout: async () => {}
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserDTO | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const authenticate = async (user: UserDTO) => {
        setUser(user)
        setIsAuthenticated(true)
    }

    const logout = async () => {
        setUser(null)
        setIsAuthenticated(false)
    }

    const value = {
        user,
        isAuthenticated,
        authenticate,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
