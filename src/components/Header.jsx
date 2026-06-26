export default function Header({children}) {
    return (
        <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
            {children}
        </header>
    )
}