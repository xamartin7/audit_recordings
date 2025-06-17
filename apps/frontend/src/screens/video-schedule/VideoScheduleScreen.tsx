import { VideoRecorder } from "../../components/video/VideoRecorder";
import { MainContentSidebarLayout } from "../../layouts/MainContentSidebarLayout";

export function VideoScheduleScreen() {

    return (
        <MainContentSidebarLayout title="Programar video">
            <VideoRecorder />
        </MainContentSidebarLayout>
    )

}