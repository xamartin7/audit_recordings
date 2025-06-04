import { ProtectedRoute } from "../../components/protect-routes/ProtectedRoute"
import { HomeScreen } from "../../screens/home/HomeScreen"

const mainRoutes = [
    {
        path: '/home',
        element: <ProtectedRoute>
                    <HomeScreen />
                </ProtectedRoute>,
    }
]

export default mainRoutes