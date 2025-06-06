import { Link } from "react-router-dom"

export const Sidebar: React.FC<{active: string, setActive: (active: string) => void}> = ({active, setActive}) => {
    return (
        <div className="w-64 bg-white shadow-md">
            <div className="p-4 text-center text-2xl font-bold text-gray-900">Dashboard</div>
            <ul>
                <li className={`p-4 ${active === 'home' ? 'bg-gray-200' : ''}`} onClick={() => setActive('home')}>
                    <Link to="/home">Home</Link>
                </li>
                <li className={`p-4 ${active === 'settings' ? 'bg-gray-200' : ''}`} onClick={() => setActive('settings')}>
                    <Link to="/settings">Settings</Link>
                </li>
            </ul>
        </div>
    )
}