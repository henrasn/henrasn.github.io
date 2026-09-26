import type { SlateNode } from "../types/slate"
import { getArticle } from "./articles"

export type Project = {
  id: string
  title: string
  description: string
  longDescription: string
  techStack: string[]
  image: string
  highlights: string[]
  links: { label: string; href: string }[]
  article?: {
    metadata: {
      title: string
      date: string
      readingTime: string
      tags: string[]
      slug?: string
      status?: "Draft" | "Published" | "Private"
      coverImage?: string
    }
    content: SlateNode[]
  }
  nextProjectId?: string
}

export const projects: Project[] = [
  {
    id: "compose-it",
    title: "Compose-It",
    description: "High-performance Jetpack Compose architecture for large-scale Android apps.",
    longDescription:
      "A showcase of modern Android architecture — modular Compose UI, MVI, Hilt, and performance-first rendering. Built to demonstrate scalable patterns for large teams.",
    techStack: ["Kotlin", "Jetpack Compose", "Hilt", "MVI", "Coroutines"],
    image: "https://lh3.googleusercontent.com/aida/AEtjO1XCMXCput-qw-DkyLtYlNnUCNA__Rw8lDhfGX1rT5r4qfeDkL9kGOzsZgWGKHpHVUhHhY6uCh9g-a_V7TVLt6UIALM5TfCRPU9ijEqr3AxzIF2h44GHoJEQL0_aALb2gJoSVSgbB-q4BmJxZOcgE_6Pxi21uLSiaQvoyLHqHSCXzW92aSBdwknmNPk5A-AraixuC4pByqWTh9hw5KaRiqSc4MkkjpLfhG1dEL2eH1t5i_r_tOmsLV-y4zpB",
    highlights: ["60fps scroll", "Modular by feature", "Snapshot testing"],
    links: [{ label: "GitHub", href: "#" }],
    nextProjectId: "sync-engine",
    article: (() => {
      const article = getArticle("compose-it")
      return article
        ? {
            metadata: {
              title: article.metadata.title,
              date: article.metadata.date ?? "",
              readingTime: article.metadata.readingTime ?? "",
              tags: article.metadata.tags,
              slug: article.metadata.slug,
              status: article.metadata.status,
              coverImage: article.metadata.coverImage,
            },
            content: article.content,
          }
        : undefined
    })(),
  },
  {
    id: "sync-engine",
    title: "SyncEngine",
    description: "Resilient offline-first data sync with conflict-free resolution.",
    longDescription:
      "An offline-first sync layer that keeps local and remote state converged — background workers, retry backoff, and conflict resolution for large Android teams.",
    techStack: ["Kotlin", "Room", "WorkManager", "DataStore"],
    image: "https://picsum.photos/seed/syncengine/800/500",
    highlights: ["Offline-first", "Conflict-free sync", "Background workers"],
    links: [{ label: "GitHub", href: "#" }],
  },
  {
    id: "sky-track",
    title: "SkyTrack",
    description: "Real-time flight tracking with offline maps and smooth animations.",
    longDescription: "Offline-first flight monitor with MapLibre, WorkManager sync, and buttery 120fps canvas.",
    techStack: ["Kotlin", "MapLibre", "Room", "WorkManager"],
    image: "https://picsum.photos/seed/skytrack/800/500",
    highlights: ["Offline maps", "Realtime sync", "Canvas rendering"],
    links: [{ label: "Case study", href: "#" }],
  },
  {
    id: "kinetic-ui",
    title: "Kinetic UI Kit",
    description: "Design system and component library for Android teams.",
    longDescription: "A shared Compose design system with tokens, theming, and accessiblity baked in.",
    techStack: ["Compose", "Design Tokens", "Tokens Studio"],
    image: "https://picsum.photos/seed/kinetic/800/500",
    highlights: ["Token pipeline", "Dark mode", "A11y"],
    links: [{ label: "Docs", href: "#" }],
  },
]

export const listProjects = () => projects
export const getProject = (id: string) => projects.find((p) => p.id === id) ?? null
export const getNextProject = (project: Project) => {
  if (project.nextProjectId) return getProject(project.nextProjectId)
  const i = projects.findIndex((p) => p.id === project.id)
  return projects[(i + 1) % projects.length] ?? null
}