import { experiences, type Experience } from "../data/experience"

const accentText: Record<NonNullable<Experience["accent"]>, string> = {
  primary: "text-primary",
  tertiary: "text-tertiary",
  outline: "text-outline",
}

const cardStyles = [
  "bg-surface-container",
  "bg-surface-container-low",
  "bg-surface-container-lowest border border-outline-variant/30",
]

const iconFor = (e: Experience, i: number) => {
  const isActive = e.active
  return isActive
    ? { name: "check_circle", color: "text-primary" }
    : { name: "arrow_right", color: accentText[i === 1 ? "tertiary" : "outline"] }
}

export function ExperienceTimeline() {
  return (
    <div className="relative pl-8">
      <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-surface-container-highest" />
      <div>
        {experiences.map((e, i) => {
          const icon = iconFor(e, i)
          const isActive = e.active
          const isLast = i === experiences.length - 1
          return (
            <div key={e.id} className={`relative group ${isLast ? "" : "mb-16"}`}>
              <div
                className={`absolute -left-[37px] top-1.5 w-[22px] h-[22px] rounded-full bg-surface border-2 flex items-center justify-center z-10 ${
                  isActive
                    ? "border-primary shadow-[0_0_10px_rgba(173,198,255,0.5)]"
                    : "border-surface-container-highest transition-colors group-hover:border-primary"
                }`}
              >
                {isActive && <div className="w-2 h-2 rounded-full bg-primary" />}
              </div>
              <div
                className={`${cardStyles[i]} p-8 rounded-2xl transition-all duration-300 hover:shadow-[0_20px_40px_rgba(173,198,255,0.05)] hover:-translate-y-1`}
              >
                <div className="flex items-center gap-4 mb-4">
                  {e.logo && (
                    <img
                      src={e.logo}
                      alt={`${e.company} logo`}
                      className={`w-12 h-12 rounded-lg object-cover ${isActive ? "" : isLast ? "grayscale opacity-80" : ""}`}
                    />
                  )}
                  <div>
                    <h3 className="font-[Space_Grotesk] text-[24px] font-medium text-on-surface">
                      {e.role}
                    </h3>
                    <div className={`flex items-center gap-2 mt-1 text-[14px] font-semibold tracking-[0.05em] ${accentText[e.accent ?? "primary"]}`}>
                      <span>{e.company}</span>
                      <span className="w-1 h-1 rounded-full bg-outline" />
                      <span>{e.period}</span>
                    </div>
                  </div>
                </div>
                {e.bullets && (
                  <ul className="flex flex-col gap-3 text-on-surface-variant">
                    {e.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-3">
                        <span className={`material-symbols-outlined text-[20px] mt-0.5 shrink-0 ${icon.color}`}>
                          {icon.name}
                        </span>
                        <span className="text-[16px] leading-[1.5]">{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
