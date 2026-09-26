const ACCENTS = ["primary", "secondary", "tertiary"] as const

const TINTS = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  tertiary: "bg-tertiary/10 text-tertiary",
} as const

export function ArticleTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {tags.map((tag, i) => (
        <span
          key={tag}
          className={`px-3 py-1 rounded-full font-semibold text-[12px] tracking-wider uppercase ${TINTS[ACCENTS[i % ACCENTS.length]]}`}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}