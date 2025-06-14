export function TitleMenu({title}: {title: string}) {
    return (
        <div className="fixed top-0 right-0 left-64 h-24 bg-white border-b border-gray-200 shadow-sm dark:bg-gray-300 dark:border-gray-400 z-30">
            <div className="h-full flex items-center px-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-900">{title}</h2>
            </div>
        </div>
    )
}