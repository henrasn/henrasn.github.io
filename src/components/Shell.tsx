import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useMode } from "../context/ModeContext"

export default function Shell() {
  const { setMode } = useMode()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const active: "professional" | "personal" =
    pathname.startsWith("/professional") ? "professional" : "personal"
  const select = (m: "professional" | "personal") => {
    setMode(m)
    navigate(m === "professional" ? "/professional" : "/personal")
  }
  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col">
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
        <div className="h-20 max-w-[1200px] mx-auto px-[20px] lg:px-[24px] flex items-center justify-between">
          <Link to="/" className="flex flex-col">
            <span className="font-[Space_Grotesk] text-[24px] font-medium text-on-surface tracking-tight leading-none">Henra Surya</span>
            <span className="text-[14px] font-semibold tracking-[0.05em] text-primary uppercase leading-none mt-1">Senior Android Engineer</span>
          </Link>
          {pathname !== "/" && (
            <div className="flex-1 flex justify-center px-[24px]">
              <div className="bg-surface-container-high rounded-full p-1.5 shadow-inner w-60 hidden md:flex">
                <button
                  onClick={() => select("professional")}
                  className={`flex-1 px-3 py-1.5 text-center text-[14px] font-semibold tracking-[0.05em] z-10 transition-colors rounded-full ${active === "professional" ? "bg-primary text-on-primary-container" : "text-on-surface-variant hover:text-on-surface"}`}
                >
                  Professional
                </button>
                <button
                  onClick={() => select("personal")}
                  className={`flex-1 px-3 py-1.5 text-center text-[14px] font-semibold tracking-[0.05em] z-10 transition-colors rounded-full ${active === "personal" ? "bg-primary text-on-primary-container" : "text-on-surface-variant hover:text-on-surface"}`}
                >
                  Personal
                </button>
              </div>
            </div>
          )}
          <nav className="flex items-center gap-6">
            <a href="https://github.com/henrasn" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-on-surface-variant hover:text-primary transition-colors flex items-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/henrasetianugraha/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-on-surface-variant hover:text-primary transition-colors flex items-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
            <a href="mailto:hello@example.com" className="text-on-surface-variant hover:text-primary transition-colors flex items-center">
              <span className="material-symbols-outlined text-[24px]">mail</span>
            </a>
          </nav>
        </div>
      </header>
      <main className="pt-20 flex-grow">
        <Outlet />
      </main>
      <footer className="border-t border-outline-variant/20 bg-surface-container-lowest py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[24px] flex flex-col md:flex-row justify-between items-center gap-[24px]">
          <div className="text-left">
            <p className="font-[Space_Grotesk] text-[24px] font-medium text-on-surface mb-2">Henra Surya</p>
            <p className="text-[16px] text-on-surface-variant">Building resilient Android architectures since 2014.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex gap-4 mb-4">
              <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">deployed_code</span>
              <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">hub</span>
              <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors">alternate_email</span>
            </div>
            <p className="text-[14px] font-semibold tracking-[0.05em] text-on-surface-variant">© {new Date().getFullYear()} Henra Surya. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
