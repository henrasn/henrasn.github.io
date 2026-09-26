import { useMemo, useState } from "react"
import { experiences } from "../../data/experience"
import { useAdminUi } from "../../context/AdminUiContext"
import { PositionCard } from "../../components/admin/PositionCard"
import { PositionModal } from "../../components/admin/PositionModal"
import { DeleteConfirmModal } from "../../components/admin/DeleteConfirmModal"
import { saveExperienceList } from "../../admin/writeBack"
import type { Experience } from "../../data/experience"

const SKILL_BARS = [
  { name: "Kotlin/Android SDK", value: 95 },
  { name: "System Architecture", value: 85 },
  { name: "CI/CD & DevOps", value: 70 },
]

type ViewMode = "list" | "grid"

function skillUtil(index: number) {
  const bar = SKILL_BARS[Math.min(index, SKILL_BARS.length - 1)]
  return bar
}

function yearsExp(list: Experience[]) {
  let earliest = Infinity
  let latest = -Infinity
  for (const item of list) {
    const start = parseYear(item.period)
    if (start != null) earliest = Math.min(earliest, start)
    if (item.current) {
      latest = new Date().getFullYear()
    } else {
      const end = parseYear(item.period, true)
      if (end != null) latest = Math.max(latest, end)
    }
  }
  if (!Number.isFinite(earliest) || !Number.isFinite(latest)) return 0
  return Math.max(latest - earliest, 0)
}

function parseYear(period: string | undefined, end = false) {
  if (!period) return null
  const parts = period.split("—").map((p) => p.trim())
  const raw = end && parts.length > 1 ? parts[1] : parts[0]
  if (!raw || raw.toLowerCase() === "present") return end ? new Date().getFullYear() : null
  const m = raw.match(/(\d{4})/)
  if (!m) return null
  const year = Number(m[1])
  return Number.isFinite(year) ? year : null
}

type ModalState = { open: boolean; position: Experience | null }

export default function ExperienceManager() {
  const { search, setSaved } = useAdminUi()
  const [list, setList] = useState<Experience[]>(experiences)
  const [view, setView] = useState<ViewMode>("list")
  const [modal, setModal] = useState<ModalState>({ open: false, position: null })
  const [deleteTarget, setDeleteTarget] = useState<Experience | null>(null)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return list
    return list.filter((item) =>
      [item.role, item.company, item.location, ...(item.techStack ?? [])]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(q)),
    )
  }, [list, search])

  const persist = async (next: Experience[]) => {
    setList(next)
    const ok = await saveExperienceList(next)
    setSaved(ok)
    if (ok) {
      window.setTimeout(() => setSaved(false), 2000)
    }
  }

  const savePosition = (data: {
    role: string
    company: string
    location: string
    period: string
    startDate: string
    endDate: string
    current: boolean
    bullets: string[]
    techStack: string[]
  }) => {
    if (modal.position) {
      const updated: Experience = {
        ...modal.position,
        role: data.role,
        company: data.company,
        location: data.location,
        period: data.period,
        current: data.current,
        bullets: data.bullets,
        techStack: data.techStack,
      }
      void persist(list.map((item) => (item.id === updated.id ? updated : item)))
    } else {
      const created: Experience = {
        id: crypto.randomUUID(),
        role: data.role,
        company: data.company,
        location: data.location,
        period: data.period,
        current: data.current,
        active: false,
        accent: "outline",
        bullets: data.bullets,
        techStack: data.techStack,
        description: data.bullets[0] ?? "",
      }
      void persist([...list, created])
    }
    setModal({ open: false, position: null })
  }

  const deletePosition = (id: string) => {
    void persist(list.filter((item) => item.id !== id))
  }

  const move = (id: string, dir: -1 | 1) => {
    const index = list.findIndex((item) => item.id === id)
    if (index < 0) return
    const target = index + dir
    if (target < 0 || target >= list.length) return
    const next = [...list]
    const [item] = next.splice(index, 1)
    next.splice(target, 0, item)
    void persist(next)
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8 flex flex-col gap-8">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.08em] text-primary uppercase mb-1">
            Experience Manager
          </p>
          <h1 className="font-[Space_Grotesk] text-[32px] font-semibold text-on-surface">
            Career Timeline
          </h1>
          <p className="text-on-surface-variant mt-1 max-w-md">
            Manage the professional roles shown on your public portfolio. Changes are written back
            to the committed data file.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModal({ open: true, position: null })}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[14px] font-semibold text-on-primary hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            add
          </span>
          Add Position
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-container rounded-xl border border-outline-variant/20 p-5">
          <p className="text-[12px] font-semibold tracking-[0.08em] text-on-surface-variant uppercase mb-1">
            Total Roles
          </p>
          <p className="font-[Space_Grotesk] text-[36px] font-semibold text-on-surface">
            {list.length}
          </p>
        </div>
        <div className="bg-surface-container rounded-xl border border-outline-variant/20 p-5">
          <p className="text-[12px] font-semibold tracking-[0.08em] text-on-surface-variant uppercase mb-1">
            Years Exp.
          </p>
          <p className="font-[Space_Grotesk] text-[36px] font-semibold text-on-surface">
            {yearsExp(list)}
          </p>
        </div>
        <div className="bg-surface-container rounded-xl border border-outline-variant/20 p-5">
          <p className="text-[12px] font-semibold tracking-[0.08em] text-on-surface-variant uppercase mb-3">
            Skill Utilization
          </p>
          <div className="flex flex-col gap-2.5">
            {SKILL_BARS.map((bar, i) => (
              <div key={bar.name} className="flex items-center gap-3">
                <span className="text-[12px] text-on-surface-variant w-40 shrink-0 truncate">
                  {skillUtil(i).name}
                </span>
                <div className="flex-1 h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${skillUtil(i).value}%` }}
                  />
                </div>
                <span className="text-[12px] font-semibold text-primary w-9 text-right">
                  {skillUtil(i).value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <div className="flex rounded-lg bg-surface-container-high p-1">
          <button
            type="button"
            onClick={() => setView("list")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-semibold transition-colors ${
              view === "list" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"
            }`}
            aria-label="List view"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              view_list
            </span>
            List
          </button>
          <button
            type="button"
            onClick={() => setView("grid")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-semibold transition-colors ${
              view === "grid" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"
            }`}
            aria-label="Grid view"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              grid_view
            </span>
            Grid
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="material-symbols-outlined text-[56px] text-outline mb-3" aria-hidden="true">
            work_off
          </span>
          <p className="text-on-surface-variant">No positions match your search.</p>
        </div>
      ) : (
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 gap-4"
              : "flex flex-col gap-4"
          }
        >
          {filtered.map((item) => {
            const realIndex = list.findIndex((it) => it.id === item.id)
            return (
              <PositionCard
                key={item.id}
                position={item}
                onEdit={() => setModal({ open: true, position: item })}
                onDelete={() => setDeleteTarget(item)}
                onMoveUp={() => move(item.id, -1)}
                onMoveDown={() => move(item.id, 1)}
                canMoveUp={realIndex > 0}
                canMoveDown={realIndex < list.length - 1}
              />
            )
          })}
        </div>
      )}

      <PositionModal
        key={modal.position?.id ?? "new"}
        open={modal.open}
        initial={modal.position}
        onClose={() => setModal({ open: false, position: null })}
        onSave={savePosition}
      />

      {deleteTarget && (
        <DeleteConfirmModal
          position={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => {
            deletePosition(deleteTarget.id)
            setDeleteTarget(null)
          }}
        />
      )}
    </div>
  )
}
