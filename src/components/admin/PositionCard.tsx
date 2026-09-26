import type { Experience } from "../../data/experience"

type PositionCardProps = {
  position: Experience
  onEdit: () => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  canMoveUp: boolean
  canMoveDown: boolean
}

const fallbackIcon = (name: string) => name.slice(0, 1).toUpperCase()

export function PositionCard({
  position,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: PositionCardProps) {
  return (
    <div className="bg-surface-container rounded-2xl border border-outline-variant/30 p-6 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        {position.logo ? (
          <img
            src={position.logo}
            alt={`${position.company} logo`}
            className="w-12 h-12 rounded-lg object-cover"
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).style.display = "none"
            }}
          />
        ) : null}
        {!position.logo && (
          <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center text-primary font-[Space_Grotesk] text-[20px] font-semibold">
            {fallbackIcon(position.company)}
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-[Space_Grotesk] text-[18px] font-medium text-on-surface">
              {position.role}
            </h3>
            {position.current && (
              <span className="inline-flex items-center rounded-full bg-primary/15 text-primary px-2.5 py-0.5 text-[11px] font-semibold tracking-[0.05em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1" aria-hidden="true" />
                Current
              </span>
            )}
          </div>
          <p className="text-[14px] text-on-surface-variant mt-0.5">
            {position.company}
            {position.location ? <span className="text-outline"> • {position.location}</span> : null}
          </p>
          <p className="text-[13px] text-on-surface-variant mt-0.5">
            {position.period}
            {position.employmentType ? (
              <span className="text-outline"> • {position.employmentType}</span>
            ) : null}
          </p>
        </div>
      </div>

      {position.bullets && position.bullets.length > 0 && (
        <ul className="flex flex-col gap-2">
          {position.bullets.map((b, bi) => (
            <li key={bi} className="flex items-start gap-2 text-[14px] leading-[1.5] text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-primary mt-0.5 shrink-0" aria-hidden="true">
                arrow_right
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {position.techStack && position.techStack.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {position.techStack.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full bg-surface-container-high text-on-surface-variant px-2.5 py-1 text-[12px] font-semibold"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/20">
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-semibold text-on-surface hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            edit
          </span>
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-semibold text-error hover:bg-error/10 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            delete
          </span>
          Delete
        </button>
        <div className="flex-1" />
        <button
          type="button"
          onClick={onMoveUp}
          disabled={!canMoveUp}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Move up"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            arrow_upward
          </span>
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={!canMoveDown}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Move down"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            arrow_downward
          </span>
        </button>
      </div>
    </div>
  )
}
