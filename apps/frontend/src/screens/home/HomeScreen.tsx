import { useState } from 'react';
import { Sidebar } from '../../components/common/sidebar';
import { Topnav } from '../../components/common/Topnav';

export function HomeScreen() {
    const [active, setActive] = useState('home');

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar active={active} setActive={setActive}></Sidebar>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Top navigation */}
                <Topnav active={active}></Topnav>

                {/* Content area */}
                <div className="flex-1 p-6">
                    <h2 className="text-2xl font-bold text-gray-900">{active.charAt(0).toUpperCase() + active.slice(1)} Page</h2>
                    <p className="text-gray-500">This is the {active} page content.</p>
                </div>
            </div>
        </div>
    );
}
