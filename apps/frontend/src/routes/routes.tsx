import { Navigate, RouteObject } from "react-router-dom";
import authRoutes from "./auth/Auth.routes";
import mainRoutes from "./home/Main.routes";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to='/login' />,
    },
    ...authRoutes,
    ...mainRoutes
];

export default routes;
