import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Shell from "./components/Shell"
import Home from "./pages/Home"
import Professional from "./pages/Professional"
import Personal from "./pages/Personal"
import ProjectDetail from "./pages/ProjectDetail"

const AdminPortal = import.meta.env.DEV
  ? lazy(() => import("./admin/AdminRoutes"))
  : null

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<Home />} />
        <Route path="/professional" element={<Professional />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="*" element={<Home />} />
      </Route>
      {AdminPortal && (
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<AdminFallback />}>
              <AdminPortal />
            </Suspense>
          }
        />
      )}
    </Routes>
  )
}

function AdminFallback() {
  return (
    <div className="min-h-screen bg-background text-on-background flex items-center justify-center">
      <span className="material-symbols-outlined animate-spin text-primary" aria-hidden="true">
        progress_activity
      </span>
    </div>
  )
}
