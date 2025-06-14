export function MainContentLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="p-4 sm:ml-64 pt-28">
            {children}
        </div>
    );
}