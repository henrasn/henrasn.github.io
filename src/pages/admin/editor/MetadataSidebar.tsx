import { useState } from "react"

export type ArticleMetadata = {
  title: string
  slug?: string
  status?: "Draft" | "Published" | "Private"
  tags: string[]
  coverImage?: string
  date?: string
  readingTime?: string
  [key: string]: unknown
}

type MetadataSidebarProps = {
  metadata: ArticleMetadata
  onChange: (patch: Partial<ArticleMetadata>) => void
}

const VISIBILITY = ["Draft", "Published", "Private"]

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wide">
        {label}
      </span>
      {children}
    </label>
  )
}

const inputClass =
  "w-full bg-surface-container-high border border-outline-variant/30 rounded-lg px-3 py-2 text-[14px] text-on-surface placeholder:text-on-surface-variant outline-none focus:border-primary transition-colors"

export function MetadataSidebar({ metadata, onChange }: MetadataSidebarProps) {
  const [tagInput, setTagInput] = useState("")

  const addTag = () => {
    const value = tagInput.trim()
    if (!value) return
    if (!metadata.tags.includes(value)) {
      onChange({ tags: [...metadata.tags, value] })
    }
    setTagInput("")
  }

  const removeTag = (tag: string) => {
    onChange({ tags: metadata.tags.filter((t) => t !== tag) })
  }

  return (
    <aside className="w-80 shrink-0 flex flex-col gap-5">
      <Field label="Post Title">
        <input
          className={inputClass}
          value={metadata.title}
          onChange={(e) => onChange({ title: e.target.value })}
        />
      </Field>

      <Field label="URL Slug">
        <div className="flex items-center gap-2 bg-surface-container-high border border-outline-variant/30 rounded-lg px-3 focus-within:border-primary transition-colors">
          <span className="text-[13px] text-on-surface-variant">/post/</span>
          <input
            className="bg-transparent outline-none text-[14px] text-on-surface flex-1 py-2"
            value={metadata.slug ?? ""}
            onChange={(e) => onChange({ slug: e.target.value })}
            placeholder="slug"
          />
        </div>
      </Field>

      <Field label="Visibility">
        <select
          className={inputClass}
          value={metadata.status ?? "Draft"}
          onChange={(e) => onChange({ status: e.target.value as ArticleMetadata["status"] })}
        >
          {VISIBILITY.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </Field>

      <div className="flex flex-col gap-1.5">
        <span className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wide">
          Tags
        </span>
        <div className="flex flex-wrap gap-2">
          {metadata.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1 text-[12px] font-semibold"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-on-surface transition-colors"
                aria-label={`Remove ${tag}`}
              >
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                  close
                </span>
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className={inputClass}
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addTag()
              }
            }}
            placeholder="Add tag"
          />
          <button
            type="button"
            onClick={addTag}
            className="shrink-0 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface transition-colors text-[20px] leading-none"
            aria-label="Add tag"
          >
            +
          </button>
        </div>
      </div>

      <Field label="Featured Image">
        <input
          className={inputClass}
          value={metadata.coverImage ?? ""}
          onChange={(e) => onChange({ coverImage: e.target.value })}
          placeholder="https://..."
        />
      </Field>

      {metadata.coverImage && (
        <div className="relative rounded-lg overflow-hidden group">
          <img src={metadata.coverImage} alt="" className="w-full aspect-video object-cover" />
          <button
            type="button"
            onClick={() => onChange({ coverImage: "" })}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Clear featured image"
          >
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              close
            </span>
          </button>
        </div>
      )}
    </aside>
  )
}
