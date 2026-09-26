import type { SlateNode } from "../types/slate"
import composeItArticle from "./content/articles/compose-it.json"

export type ArticleMetadata = {
  title: string
  date?: string
  readingTime?: string
  tags: string[]
  slug?: string
  status?: "Draft" | "Published" | "Private"
  coverImage?: string
  [key: string]: unknown
}

export type Article = {
  projectId: string
  metadata: ArticleMetadata
  content: SlateNode[]
}

const articles: Article[] = [
  {
    projectId: "compose-it",
    metadata: composeItArticle.metadata as ArticleMetadata,
    content: composeItArticle.content as SlateNode[],
  },
]

export const listArticles = () => articles
export const getArticle = (projectId: string) =>
  articles.find((a) => a.projectId === projectId) ?? null
