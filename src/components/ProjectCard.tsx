import { Link } from "react-router-dom"
import { Chip } from "./Chip"
import type { Project } from "../data/projects"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/project/${project.id}`}
      className="group block rounded-[1.5rem] bg-surface-container border border-[#334155] hover:border-primary transition-colors overflow-hidden hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)]"
    >
      <div className="aspect-[16/9] overflow-hidden bg-surface-container-high">
        <img src={project.image} alt="" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300" />
      </div>
      <div className="p-6">
        <h3 className="font-[Space_Grotesk] text-[20px] font-medium text-on-surface">{project.title}</h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-on-surface-variant line-clamp-2">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      </div>
    </Link>
  )
}
