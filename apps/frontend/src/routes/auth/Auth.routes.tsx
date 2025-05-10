import { LoginScreen } from "../../screens/auth/LoginScreen";
import { SignupScreen } from "../../screens/auth/SignupScreen";
import { AuthCallbackScreen } from "../../screens/auth/AuthCallbackScreen";

const authRoutes = [
    {
        path: '/login',
        element: <LoginScreen />,
    },
    {
        path: '/signup',
        element: <SignupScreen />,
    },
    {
        path: '/auth/callback',
        element: <AuthCallbackScreen />,
    }
]

export default authRoutes;

