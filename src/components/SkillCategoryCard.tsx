import type { SkillCategory } from "../data/skills"

const accentStyles: Record<SkillCategory["accent"], { text: string; blob: string; chip: string }> = {
  primary: {
    text: "text-primary",
    blob: "bg-primary/10 group-hover:bg-primary/20",
    chip: "bg-primary/10 text-primary",
  },
  secondary: {
    text: "text-secondary",
    blob: "bg-secondary/10 group-hover:bg-secondary/20",
    chip: "bg-secondary/10 text-secondary",
  },
  tertiary: {
    text: "text-tertiary",
    blob: "bg-tertiary/10 group-hover:bg-tertiary/20",
    chip: "bg-tertiary/10 text-tertiary",
  },
}

export function SkillCategoryCard({ category }: { category: SkillCategory }) {
  const accent = accentStyles[category.accent]
  return (
    <div className="bg-surface-container p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 shadow-lg">
      <div className={`absolute -right-12 -top-12 w-32 h-32 rounded-full blur-xl transition-colors ${accent.blob}`} />
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <span className={`material-symbols-outlined text-[28px] ${accent.text}`}>{category.icon}</span>
        <h3 className="font-[Space_Grotesk] text-[24px] font-medium text-on-surface">{category.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2 relative z-10">
        {category.skills.map((skill) => (
          <span
            key={skill.label}
            className={`px-3 py-1.5 rounded-full font-[Inter] text-[14px] leading-[1.5] ${
              skill.highlighted
                ? `${accent.chip} font-[Inter]`
                : "bg-outline-variant/20 text-on-surface-variant"
            }`}
          >
            {skill.label}
          </span>
        ))}
      </div>
    </div>
  )
}
