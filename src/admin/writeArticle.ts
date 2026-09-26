import type { Article } from "../data/articles"

export async function saveArticle(
  projectId: string,
  payload: Pick<Article, "metadata" | "content">,
): Promise<boolean> {
  try {
    const res = await fetch(`/__admin/articles/${encodeURIComponent(projectId)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) return false
    const data: unknown = await res.json()
    return typeof data === "object" && data !== null && (data as { ok?: boolean }).ok === true
  } catch {
    return false
  }
}
