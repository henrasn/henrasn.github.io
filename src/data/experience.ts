import experienceData from "./content/experience.json"

export type Experience = {
  id: string
  role: string
  company: string
  period: string
  description: string
  logo?: string
  bullets?: string[]
  accent?: "primary" | "tertiary" | "outline"
  active?: boolean
  location?: string
  employmentType?: "Full-time" | "Part-time" | "Contract" | "Freelance"
  techStack?: string[]
  current?: boolean
}

export const experiences = experienceData as Experience[]
