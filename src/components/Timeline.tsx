import { experiences } from "../data/experience"

export function Timeline() {
  return (
    <div className="relative pl-8">
      <div className="absolute left-[5px] top-1 bottom-1 w-[2px] bg-outline-variant/30" />
      <div className="space-y-10">
        {experiences.map((e) => (
          <div key={e.id} className="relative">
            <div
              className={`absolute -left-8 top-1 w-3 h-3 rounded-full border-2 ${e.active ? "bg-primary border-primary shadow-[0_0_12px_rgba(59,130,246,0.6)]" : "bg-surface border-outline-variant"}`}
            />
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="font-[Space_Grotesk] text-[18px] font-medium text-on-surface">{e.role}</h3>
              <span className="text-sm text-primary font-semibold">{e.company}</span>
              <span className="text-sm text-outline">· {e.period}</span>
            </div>
            <p className="mt-2 text-[14px] leading-relaxed text-on-surface-variant max-w-2xl">{e.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
