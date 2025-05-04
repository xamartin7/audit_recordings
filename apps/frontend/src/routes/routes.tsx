import { Navigate, RouteObject } from "react-router-dom";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { SignupScreen } from "../screens/auth/SignupScreen";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to='/login' />,
    },
    {
        path: '/login',
        element: <LoginScreen />,
    },
    {
        path: '/signup',
        element: <SignupScreen />,
    }
];

export default routes;
