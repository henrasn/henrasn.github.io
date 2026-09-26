import type { Experience } from "../data/experience"

export async function saveExperienceList(list: Experience[]): Promise<boolean> {
  try {
    const res = await fetch("/__admin/experience", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(list),
    })
    if (!res.ok) return false
    const data: unknown = await res.json()
    return typeof data === "object" && data !== null && (data as { ok?: boolean }).ok === true
  } catch {
    return false
  }
}
