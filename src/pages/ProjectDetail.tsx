import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getNextProject, getProject } from "../data/projects"
import type { Project } from "../data/projects"
import { Chip } from "../components/Chip"
import { ArticleTags } from "../components/article/ArticleTags"
import { SlateArticleViewer } from "../components/article/SlateArticleViewer"

export default function ProjectDetail() {
  const { id } = useParams()
  const project = id ? getProject(id) : null

  if (!project) {
    return (
      <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[24px] py-24 text-center">
        <h2 className="font-[Space_Grotesk] text-2xl text-on-surface">Project not found</h2>
        <p className="mt-2 text-on-surface-variant">We couldn't find that project.</p>
        <Link to="/" className="mt-6 inline-flex px-6 py-3 rounded-full bg-primary text-on-primary font-semibold">Back to Home</Link>
      </div>
    )
  }

  return project.article ? <ArticleDetail project={project} /> : <FallbackDetail project={project} />
}

function ArticleDetail({ project }: { project: Project }) {
  const article = project.article!
  const next = getNextProject(project)
  const [shared, setShared] = useState(false)
  const [saved, setSaved] = useState(false)

  const share = async () => {
    const data = { title: article.metadata.title, text: `${article.metadata.title} — ${project.title}`, url: window.location.href }
    if (navigator.share) {
      try {
        await navigator.share(data)
        return
      } catch {
        /* cancelled */
      }
    }
    await navigator.clipboard?.writeText(data.url)
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  const save = async () => {
    await navigator.clipboard?.writeText(window.location.href)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const url = `mailto:hello@example.com?subject=${encodeURIComponent(article.metadata.title)}&body=${encodeURIComponent(`${article.metadata.title}\n${window.location.href}`)}`

  return (
    <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[24px] w-full py-12">
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group"
        >
          <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1 text-[20px]">arrow_back</span>
          <span className="text-[14px] font-semibold tracking-[0.05em]">Back to Playground</span>
        </Link>
        <div className="flex items-center gap-4">
          <button
            onClick={share}
            aria-label="Share"
            className="text-on-surface-variant hover:text-primary transition-colors flex items-center"
          >
            <span className="material-symbols-outlined">{shared ? "check" : "share"}</span>
          </button>
          <a href={url} aria-label="Email" className="text-on-surface-variant hover:text-primary transition-colors flex items-center">
            <span className="material-symbols-outlined">mail</span>
          </a>
        </div>
      </div>

      <article className="flex flex-col items-center mt-8">
        <header className="w-full text-center flex flex-col items-center mb-16 relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-tertiary/10 blur-[100px] pointer-events-none rounded-full" />
          <ArticleTags tags={article.metadata.tags} />
          <h1 className="font-[Space_Grotesk] text-[40px] md:text-[64px] font-bold tracking-[-0.02em] leading-[1.1] text-on-surface mb-8 max-w-4xl text-balance">
            {article.metadata.title}
          </h1>
          <div className="flex items-center gap-6 text-on-surface-variant font-code text-[14px]">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              {article.metadata.date}
            </span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              {article.metadata.readingTime}
            </span>
          </div>
        </header>

        <div className="w-full h-[300px] sm:h-[450px] md:h-[600px] mb-20 rounded-2xl overflow-hidden relative shadow-xl shadow-surface-container-highest/50">
          <img
            src={article.metadata.coverImage ?? project.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <SlateArticleViewer content={article.content} />

        <div className="max-w-[800px] mx-auto w-full border-t border-outline-variant/20 pt-12 mt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-4">
            <button
              onClick={share}
              aria-label="Share"
              className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined">{shared ? "check" : "share"}</span>
            </button>
            <button
              onClick={save}
              aria-label="Bookmark"
              className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined">{saved ? "bookmark_added" : "bookmark"}</span>
            </button>
          </div>
          {next && (
            <Link to={`/project/${next.id}`} className="group flex flex-col items-end text-right">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-outline mb-2 group-hover:text-primary transition-colors">
                Next Project
              </span>
              <div className="flex items-center gap-4">
                <span className="font-[Space_Grotesk] text-[24px] font-medium text-on-surface group-hover:text-primary transition-colors">
                  {next.title}
                </span>
                <span className="material-symbols-outlined text-on-surface group-hover:text-primary transition-transform group-hover:translate-x-2">
                  arrow_forward
                </span>
              </div>
            </Link>
          )}
        </div>
      </article>
    </div>
  )
}

function FallbackDetail({ project }: { project: Project }) {
  return (
    <div className="max-w-[1200px] mx-auto px-[20px] lg:px-[24px] py-8 space-y-10">
      <Link to="/professional" className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span> Back to projects
      </Link>

      <div className="rounded-[1.5rem] overflow-hidden bg-surface-container border border-outline-variant/20">
        <div className="aspect-[16/9] bg-surface-container-high">
          <img src={project.image} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="p-8 md:p-10">
          <h1 className="font-[Space_Grotesk] text-[32px] md:text-[40px] font-semibold text-on-surface">{project.title}</h1>
          <p className="mt-3 text-on-surface-variant leading-relaxed max-w-3xl">{project.longDescription}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {project.highlights.map((h) => (
              <div key={h} className="rounded-xl bg-background border border-outline-variant/20 p-4 text-sm text-on-surface-variant">{h}</div>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            {project.links.map((l) => (
              <a key={l.label} href={l.href} className="px-5 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold">{l.label}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}