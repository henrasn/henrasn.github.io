/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react"

type AdminUiContextValue = {
  search: string
  setSearch: (value: string) => void
  saved: boolean
  setSaved: (value: boolean) => void
}

const AdminUiContext = createContext<AdminUiContextValue | null>(null)

export function AdminUiProvider({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("")
  const [saved, setSaved] = useState(false)

  return (
    <AdminUiContext.Provider value={{ search, setSearch, saved, setSaved }}>
      {children}
    </AdminUiContext.Provider>
  )
}

export function useAdminUi() {
  const ctx = useContext(AdminUiContext)
  if (!ctx) throw new Error("useAdminUi must be used within AdminUiProvider")
  return ctx
}
