import { useState } from "react"
import { FilterChip } from "../components/FilterChip"
import { PersonalCard } from "../components/PersonalCard"
import { personalProjects } from "../data/personal"

const FILTERS = [
  { key: "all", label: "All", hover: "" },
  { key: "android", label: "Android", hover: "hover:text-secondary-fixed" },
  { key: "web", label: "Web", hover: "hover:text-tertiary-fixed" },
  { key: "experiments", label: "Experiments", hover: "hover:text-primary-fixed" },
  { key: "oss", label: "Open Source", hover: "hover:text-error-container" },
] as const

export default function Personal() {
  const [filter, setFilter] = useState("all")
  const visible =
    filter === "all" ? personalProjects : personalProjects.filter((p) => p.categories.includes(filter))

  return (
    <div className="relative overflow-hidden">
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-secondary-fixed/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-[30%] -right-[20%] w-[60%] h-[60%] bg-tertiary-fixed/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-[20px] lg:px-[24px] w-full pb-[120px]">
        <div className="flex flex-col items-start gap-4 mb-16 pt-8">
          <h1 className="font-[Space_Grotesk] text-[48px] md:text-[64px] font-bold tracking-[-0.02em] leading-[1.1] text-on-surface">
            Digital <span className="text-secondary-fixed">Playground</span>
          </h1>
          <p className="max-w-2xl text-[18px] leading-[1.6] text-on-surface-variant">
            Where side projects live, open source breathes, and weird experiments go to thrive. A
            collection of late-night coding sessions and &quot;what if&quot; moments.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-12">
          {FILTERS.map((f) => (
            <FilterChip
              key={f.key}
              label={f.label}
              active={filter === f.key}
              hoverClassName={f.hover}
              onClick={() => setFilter(f.key)}
            />
          ))}
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {visible.map((p) => (
            <PersonalCard key={p.id} project={p} />
          ))}
        </div>
      </div>

      <footer className="w-full bg-surface-container-low border-t border-outline-variant/10 py-12 mt-[120px]">
        <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[24px] flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-[Space_Grotesk] text-[24px] font-medium text-on-surface">John Doe</span>
            <p className="text-[16px] leading-[1.5] text-on-surface-variant">© 2024. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer">database</span>
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer">public</span>
            <span className="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer">send</span>
          </div>
          <div className="text-[14px] font-semibold tracking-[0.05em] text-outline">
            Built with <span className="text-tertiary">Stitch</span>
          </div>
        </div>
      </footer>
    </div>
  )
}