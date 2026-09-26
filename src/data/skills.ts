export type SkillChip = {
  label: string
  highlighted: boolean
}

export type SkillCategory = {
  title: string
  icon: string
  accent: "primary" | "secondary" | "tertiary"
  skills: SkillChip[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: "code_blocks",
    accent: "primary",
    skills: [
      { label: "Kotlin", highlighted: true },
      { label: "Java", highlighted: true },
      { label: "Groovy", highlighted: true },
      { label: "KTS", highlighted: true },
      { label: "Bash", highlighted: false },
      { label: "Python", highlighted: false },
    ],
  },
  {
    title: "Frameworks",
    icon: "extension",
    accent: "secondary",
    skills: [
      { label: "Jetpack Compose", highlighted: true },
      { label: "Coroutines", highlighted: true },
      { label: "Flow / StateFlow", highlighted: true },
      { label: "Android SDK", highlighted: true },
      { label: "Retrofit", highlighted: false },
      { label: "Room", highlighted: false },
    ],
  },
  {
    title: "Architecture",
    icon: "architecture",
    accent: "tertiary",
    skills: [
      { label: "MVVM / MVI", highlighted: true },
      { label: "Clean Architecture", highlighted: true },
      { label: "Hilt / Dagger", highlighted: true },
      { label: "Multi-module", highlighted: true },
      { label: "JUnit 4/5", highlighted: false },
      { label: "Espresso", highlighted: false },
    ],
  },
]
