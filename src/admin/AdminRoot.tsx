import { NavLink, Outlet } from "react-router-dom"
import { useAdminUi } from "../context/AdminUiContext"

const navItems = [
  { to: "dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "experience", label: "Experience", icon: "work" },
  { to: "projects", label: "Projects", icon: "folder" },
  { to: "editor/compose-it", label: "Content Editor", icon: "edit_note" },
]

function NavLinkItem({ to, label, icon }: { to: string; label: string; icon: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-semibold transition-colors ${
          isActive
            ? "bg-primary/15 text-primary"
            : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
        }`
      }
    >
      <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
        {icon}
      </span>
      {label}
    </NavLink>
  )
}

export default function AdminRoot() {
  const { search, setSearch, saved } = useAdminUi()

  return (
    <div className="min-h-screen bg-background text-on-background">
      <aside className="fixed left-0 top-0 bottom-0 w-72 bg-surface-container-low border-r border-outline-variant/20 flex flex-col">
        <div className="flex items-center gap-3 px-5 h-20 border-b border-outline-variant/20">
          <span className="material-symbols-outlined text-primary" aria-hidden="true">
            terminal
          </span>
          <div className="flex flex-col">
            <span className="font-[Space_Grotesk] text-[18px] font-semibold text-on-surface leading-none">
              DevAdmin
            </span>
            <span className="text-[12px] font-semibold tracking-[0.05em] text-on-surface-variant uppercase">
              Control Panel
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-5 flex flex-col gap-6 overflow-y-auto">
          <div>
            <p className="px-3 pb-2 text-[12px] font-semibold tracking-[0.08em] text-on-surface-variant uppercase">
              Main
            </p>
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLinkItem key={item.to} {...item} />
              ))}
            </div>
          </div>
          <div>
            <p className="px-3 pb-2 text-[12px] font-semibold tracking-[0.08em] text-on-surface-variant uppercase">
              System
            </p>
            <div className="flex flex-col gap-1">
              <NavLinkItem to="settings" label="Settings" icon="settings" />
            </div>
          </div>
        </nav>

        <div className="px-3 py-4 border-t border-outline-variant/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-primary" aria-hidden="true">
                person
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-on-surface leading-tight">
                Admin User
              </span>
              <span className="text-[12px] text-on-surface-variant leading-tight">
                Root Access
              </span>
            </div>
          </div>
          <button
            type="button"
            className="text-on-surface-variant hover:text-error transition-colors"
            aria-label="Logout"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              logout
            </span>
          </button>
        </div>
      </aside>

      <div className="pl-72">
        <header className="fixed top-0 right-0 left-72 h-20 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 flex items-center gap-4 px-6 z-40">
          <div className="flex-1 flex items-center gap-3 bg-surface-container-high rounded-lg px-3 py-2 max-w-md">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]" aria-hidden="true">
              search
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search positions..."
              className="bg-transparent outline-none text-[14px] text-on-surface placeholder:text-on-surface-variant w-full"
            />
          </div>
          {saved && (
            <span className="text-[12px] font-semibold text-secondary uppercase hidden md:block">
              Saved
            </span>
          )}
          <button type="button" className="text-on-surface-variant hover:text-on-surface transition-colors" aria-label="Notifications">
            <span className="material-symbols-outlined" aria-hidden="true">
              notifications
            </span>
          </button>
          <button type="button" className="text-on-surface-variant hover:text-on-surface transition-colors" aria-label="Help">
            <span className="material-symbols-outlined" aria-hidden="true">
              help
            </span>
          </button>
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px] text-primary" aria-hidden="true">
              account_circle
            </span>
          </div>
        </header>

        <main className="pt-20">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
