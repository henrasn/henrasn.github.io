import { Navigate, Route, Routes } from "react-router-dom"
import AdminRoot from "./AdminRoot"
import ExperienceManager from "../pages/admin/ExperienceManager"
import ContentEditor from "../pages/admin/ContentEditor"
import { AdminUiProvider } from "../context/AdminUiContext"

export default function AdminRoutes() {
  return (
    <AdminUiProvider>
      <Routes>
        <Route element={<AdminRoot />}>
          <Route index element={<Navigate to="experience" replace />} />
          <Route path="experience" element={<ExperienceManager />} />
          <Route path="editor/:projectId" element={<ContentEditor />} />
          <Route path="dashboard" element={<Placeholder section="Dashboard" />} />
          <Route path="projects" element={<Placeholder section="Projects" />} />
          <Route path="settings" element={<Placeholder section="Settings" />} />
        </Route>
      </Routes>
    </AdminUiProvider>
  )
}

function Placeholder({ section }: { section: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <span className="material-symbols-outlined text-[64px] text-outline mb-4" aria-hidden="true">
        construction
      </span>
      <h1 className="font-[Space_Grotesk] text-[32px] font-semibold text-on-surface mb-2">
        {section}
      </h1>
      <p className="text-on-surface-variant max-w-sm">
        This section is not built yet. It is a placeholder in the admin experience.
      </p>
    </div>
  )
}
