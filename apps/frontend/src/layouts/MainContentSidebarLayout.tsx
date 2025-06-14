import { Sidebar } from "../components/common/Sidebar";
import { TitleMenu } from "../components/common/TitleMenu";
import { MainContentLayout } from "./MainContentLayout";

interface MainContentSidebarLayoutProps {
    children: React.ReactNode;
    title: string;
}

export function MainContentSidebarLayout({ children, title }: MainContentSidebarLayoutProps) {
    return (
        <div className="flex h-screen bg-gray-200">
            {/* Sidebar */}
            <Sidebar></Sidebar>

            {/* Main content */}
            <MainContentLayout>
                <TitleMenu title={title} />
                {children}
            </MainContentLayout>
        </div>
    )
}