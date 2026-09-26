import { Link } from "react-router-dom"
import type { ChipVariant, PersonalProject } from "../data/personal"
import { getProject } from "../data/projects"

const accentStyles: Record<PersonalProject["accent"], { title: string; shadow: string; overlay: string }> = {
  teal: {
    title: "group-hover:text-secondary-fixed",
    shadow: "hover:shadow-[0_20px_40px_rgba(98,250,227,0.1)]",
    overlay: "from-secondary-fixed/5",
  },
  coral: {
    title: "group-hover:text-tertiary-fixed",
    shadow: "hover:shadow-[0_20px_40px_rgba(255,183,134,0.1)]",
    overlay: "from-tertiary-fixed/5",
  },
  blue: {
    title: "group-hover:text-primary-fixed",
    shadow: "hover:shadow-[0_20px_40px_rgba(216,226,255,0.1)]",
    overlay: "from-primary-fixed/5",
  },
  red: {
    title: "group-hover:text-error",
    shadow: "hover:shadow-[0_20px_40px_rgba(255,218,214,0.1)]",
    overlay: "from-error-container/5",
  },
}

const chipVariants: Record<ChipVariant, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  tertiary: "bg-tertiary/10 text-tertiary",
  rust: "bg-[#f74c00]/10 text-[#f74c00]",
  neutral: "bg-surface-container-highest text-on-surface",
  neutralVariant: "bg-surface-container-high text-on-surface-variant",
}

const heights: Record<number, string> = {
  40: "h-40",
  48: "h-48",
  56: "h-56",
  64: "h-64",
}

function Thumbnail({ thumbnail }: { thumbnail: PersonalProject["thumbnail"] }) {
  if (thumbnail.kind === "image") {
    return (
      <div className={`${heights[thumbnail.height]} w-full relative overflow-hidden bg-surface-container-high`}>
        <img
          src={thumbnail.src}
          alt=""
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 ${
            thumbnail.blend ? "mix-blend-luminosity group-hover:mix-blend-normal" : ""
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent" />
      </div>
    )
  }

  if (thumbnail.kind === "typographic") {
    return (
      <div
        className={`${heights[thumbnail.height]} w-full relative overflow-hidden bg-surface-container-highest flex items-center justify-center p-6 text-center`}
      >
        <h4 className="font-[Space_Grotesk] text-[48px] md:text-[64px] font-bold tracking-[-0.02em] text-on-surface opacity-20 -rotate-12 group-hover:rotate-0 transition-transform duration-500">
          {thumbnail.text}
        </h4>
      </div>
    )
  }

  const gradient = thumbnail.via
    ? `linear-gradient(to bottom right, ${thumbnail.from}, ${thumbnail.via}, ${thumbnail.to})`
    : `linear-gradient(to right, ${thumbnail.from}, ${thumbnail.to})`

  return (
    <div className={`${heights[thumbnail.height]} w-full relative overflow-hidden`} style={{ background: gradient }}>
      <div className="absolute inset-0 bg-surface/20 mix-blend-overlay" />
      {thumbnail.wave && (
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
        </svg>
      )}
      {thumbnail.icon && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-95 group-hover:scale-100">
          <span className="material-symbols-outlined text-white text-[48px] drop-shadow-lg">{thumbnail.icon}</span>
        </div>
      )}
    </div>
  )
}

export function PersonalCard({ project }: { project: PersonalProject }) {
  const accent = accentStyles[project.accent]
  const detailHref = getProject(project.id) ? `/project/${project.id}` : null
  const cardClass = `group block break-inside-avoid bg-surface-container rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 relative ${accent.shadow} animate-[card-in_0.3s_ease-out]`
  const content = (
    <>
      <div
        className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${accent.overlay}`}
      />
      <Thumbnail thumbnail={project.thumbnail} />
      <div className="p-6 flex flex-col gap-4 relative z-10">
        <div className="flex justify-between items-start">
          <h3 className={`font-[Space_Grotesk] text-[24px] font-medium text-on-surface transition-colors ${accent.title}`}>
            {project.title}
          </h3>
          <div className="flex gap-2 text-on-surface-variant">
            {project.links.map((link) => (
              <a
                key={link.icon}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                className="hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
              </a>
            ))}
          </div>
        </div>
        <p className={`text-[16px] leading-[1.5] text-on-surface-variant ${project.clamp ? "line-clamp-3" : ""}`}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.chips.map((chip) => (
            <span
              key={chip.label}
              className={`px-3 py-1 rounded-full font-[Inter] text-[14px] leading-[1.5] ${chipVariants[chip.variant]}`}
            >
              {chip.label}
            </span>
          ))}
        </div>
      </div>
    </>
  )

  if (detailHref) {
    return (
      <Link to={detailHref} className={cardClass} aria-label={`View ${project.title} details`}>
        {content}
      </Link>
    )
  }
  return <div className={cardClass}>{content}</div>
}