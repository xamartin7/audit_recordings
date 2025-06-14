import { Sidebar } from '../../components/common/Sidebar';
//import { Topnav } from '../../components/common/Topnav';

export function HomeScreen() {

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar></Sidebar>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Top navigation */}
                {/* <Topnav></Topnav> */}

                {/* Content area */}
                <div className="flex-1 p-6">
                    <h2 className="text-2xl font-bold text-gray-900">Home Page</h2>
                    <p className="text-gray-500">This is the Home page content.</p>
                </div>
            </div>
        </div>
    );
}
