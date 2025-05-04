import { LoginScreen } from "../../screens/auth/LoginScreen";
import { SignupScreen } from "../../screens/auth/SignupScreen";

const authRoutes = [
    {
        path: '/login',
        element: <LoginScreen />,
    },
    {
        path: '/signup',
        element: <SignupScreen />,
    }
]

export default authRoutes;

