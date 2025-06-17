import { ProtectedRoute } from "../../components/protect-routes/ProtectedRoute"
import { HomeScreen } from "../../screens/home/HomeScreen"
import { VideoScheduleScreen } from "../../screens/video-schedule/VideoScheduleScreen"

const mainRoutes = [
    {
        path: '/home',
        element: <ProtectedRoute>
                    <HomeScreen />
                </ProtectedRoute>,
    },
    {
        path: '/video-schedule',
        element: <ProtectedRoute>
            <VideoScheduleScreen />
        </ProtectedRoute>,
    }
]

export default mainRoutes