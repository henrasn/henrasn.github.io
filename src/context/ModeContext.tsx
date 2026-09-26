/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Mode = "professional" | "personal"

const ModeContext = createContext<{
  mode: Mode
  setMode: (m: Mode) => void
  toggle: () => void
} | null>(null)

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>(() => {
    const saved = sessionStorage.getItem("mode") as Mode | null
    if (saved === "personal" || saved === "professional") return saved
    const path = window.location.pathname
    if (path.startsWith("/personal")) return "personal"
    if (path.startsWith("/professional")) return "professional"
    return "professional"
  })

  const setMode = (m: Mode) => {
    setModeState(m)
    sessionStorage.setItem("mode", m)
  }

  const toggle = () => setMode(mode === "professional" ? "personal" : "professional")

  useEffect(() => {
    document.documentElement.dataset.mode = mode
  }, [mode])

  return <ModeContext.Provider value={{ mode, setMode, toggle }}>{children}</ModeContext.Provider>
}

export function useMode() {
  const ctx = useContext(ModeContext)
  if (!ctx) throw new Error("useMode must be inside ModeProvider")
  return ctx
}


