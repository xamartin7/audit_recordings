import { Navigate, RouteObject } from "react-router-dom";
import authRoutes from "./auth/authRoutes";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to='/login' />,
    },
    ...authRoutes
];

export default routes;
