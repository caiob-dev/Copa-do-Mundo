import copa from "../assets/copa.png"; 

export default function Footer({children}) {
    return (
        <footer className="border-t border-border py-12 px-6 backdrop-blur-xl bg-background/70">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="display flex text-xl tracking-wider  h-8">COPA 2026 · <img className="" src={copa}/></div>
            {children}
        </div>
      </footer>
    )
}