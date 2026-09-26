import { useState, type FormEvent, type ReactNode } from "react"
import type { Experience } from "../../data/experience"

type PositionModalProps = {
  open: boolean
  initial?: Experience | null
  onClose: () => void
  onSave: (data: {
    role: string
    company: string
    location: string
    period: string
    startDate: string
    endDate: string
    current: boolean
    bullets: string[]
    techStack: string[]
  }) => void
}

type MonthYear = { year: string; month: string }

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

function monthToNum(name: string) {
  const idx = MONTHS.findIndex((m) => m.toLowerCase() === name.toLowerCase())
  return idx >= 0 ? String(idx + 1).padStart(2, "0") : ""
}

function monthFromNum(mm: string) {
  const n = Number(mm)
  return n >= 1 && n <= 12 ? MONTHS[n - 1] : ""
}

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: 60 }, (_, i) => CURRENT_YEAR - i)

function monthYearLabel({ year, month }: MonthYear) {
  if (!year) return ""
  const monthName = monthFromNum(month)
  return monthName ? `${monthName} ${year}` : year
}

function parseMonth(inp: string) {
  const name = MONTHS.find((m) => m.toLowerCase() === inp.toLowerCase())
  if (name) return monthToNum(name)
  const mm = inp.match(/^\d{1,2}/)
  if (mm) return String(Number(mm[0])).padStart(2, "0")
  return ""
}

function parseDateSegment(segment: string): MonthYear {
  if (!segment) return { year: "", month: "" }
  const midYear = segment.match(/(\d{4})/)
  const year = midYear ? midYear[1] : ""
  const midMonth = segment.match(/^([A-Za-z]+)/)
  const month = midMonth ? parseMonth(midMonth[1]) : ""
  return { year, month }
}

function periodFor(start: MonthYear, end: MonthYear, current: boolean) {
  const startLabel = monthYearLabel(start)
  if (!startLabel) return ""
  const endLabel = current ? "Present" : monthYearLabel(end)
  return endLabel ? `${startLabel} — ${endLabel}` : startLabel
}

function Label({ children }: { children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-[13px] font-semibold text-on-surface-variant">
      {children}
    </label>
  )
}

const inputClass =
  "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-3 py-2 text-[14px] text-on-surface placeholder:text-on-surface-variant outline-none focus:border-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"

type DateSelectProps = {
  value: MonthYear
  onChange: (value: MonthYear) => void
  disabled?: boolean
}

function DateSelect({ value, onChange, disabled }: DateSelectProps) {
  return (
    <div className="flex gap-3">
      <select
        className={inputClass}
        value={value.month}
        disabled={disabled}
        onChange={(e) => onChange({ ...value, month: e.target.value })}
        aria-label="Month"
      >
        <option value="">Month</option>
        {MONTHS.map((m) => (
          <option key={m} value={monthToNum(m)}>
            {m}
          </option>
        ))}
      </select>
      <select
        className={inputClass}
        value={value.year}
        disabled={disabled}
        onChange={(e) => onChange({ ...value, year: e.target.value })}
        aria-label="Year"
      >
        <option value="">Year</option>
        {YEARS.map((y) => (
          <option key={y} value={String(y)}>
            {y}
          </option>
        ))}
      </select>
    </div>
  )
}

export function PositionModal({ open, initial, onClose, onSave }: PositionModalProps) {
  const initialDates = initial?.period ? initial.period.split(" — ") : []
  const initialStart = parseDateSegment(initialDates[0] ?? "")
  const initialEnd = parseDateSegment(initialDates[1] ?? "")

  const [role, setRole] = useState(initial?.role ?? "")
  const [company, setCompany] = useState(initial?.company ?? "")
  const [location, setLocation] = useState(initial?.location ?? "")
  const [startDate, setStartDate] = useState<MonthYear>(initialStart)
  const [endDate, setEndDate] = useState<MonthYear>(initialEnd)
  const [current, setCurrent] = useState(initial?.current ?? false)
  const [bullets, setBullets] = useState(initial?.bullets?.join("\n") ?? "")
  const [techStack, setTechStack] = useState(initial?.techStack?.join(", ") ?? "")
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!role.trim() || !company.trim()) {
      setError("Role and Company are required.")
      return
    }
    const period = periodFor(startDate, endDate, current)
    onSave({
      role: role.trim(),
      company: company.trim(),
      location: location.trim(),
      period,
      startDate: monthYearLabel(startDate),
      endDate: current ? "Present" : monthYearLabel(endDate),
      current,
      bullets: bullets
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean),
      techStack: techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-[10vh]">
      <div className="w-full max-w-2xl bg-surface-container-low rounded-2xl border border-outline-variant/30 shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20">
          <h2 className="font-[Space_Grotesk] text-[20px] font-semibold text-on-surface">
            {initial ? "Edit Position" : "Add Position"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Label>
              Role Title
              <input className={inputClass} value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Lead Android Engineer" />
            </Label>
            <Label>
              Company Name
              <input className={inputClass} value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. TechNova Solutions" />
            </Label>
          </div>

          <Label>
            Location
            <input className={inputClass} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Jakarta, Indonesia" />
          </Label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Label>
              Start Date
              <DateSelect value={startDate} onChange={setStartDate} />
            </Label>
            <Label>
              End Date
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <DateSelect value={endDate} onChange={setEndDate} disabled={current} />
                </div>
                <label className="flex items-center gap-2 text-[13px] font-semibold text-on-surface-variant whitespace-nowrap pb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={current}
                    onChange={(e) => setCurrent(e.target.checked)}
                    className="accent-[var(--color-primary)] w-4 h-4"
                  />
                  Current Role
                </label>
              </div>
            </Label>
          </div>

          <Label>
            <span className="flex items-center gap-1">
              Achievements &amp; Impact
              <span className="text-primary text-[11px] font-semibold uppercase tracking-wide">Supports Markdown</span>
            </span>
            <textarea
              className={`${inputClass} min-h-[120px] resize-y`}
              value={bullets}
              onChange={(e) => setBullets(e.target.value)}
              placeholder={"One achievement per line.\nSpearheaded migration to Jetpack Compose..."}
            />
          </Label>

          <Label>
            Tech Stack
            <input className={inputClass} value={techStack} onChange={(e) => setTechStack(e.target.value)} placeholder="Kotlin, Jetpack Compose, Hilt" />
          </Label>

          {error && (
            <p className="text-[13px] font-medium text-error" role="alert">
              {error}
            </p>
          )}

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-[14px] font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-[14px] font-semibold text-on-primary bg-primary hover:opacity-90 transition-opacity"
            >
              Save Position
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
