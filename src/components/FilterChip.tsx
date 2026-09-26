export function FilterChip({
  label,
  active,
  hoverClassName,
  onClick,
}: {
  label: string
  active: boolean
  hoverClassName?: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-[14px] font-semibold tracking-[0.05em] transition-all duration-300 ${
        active
          ? "bg-secondary-fixed text-on-secondary-fixed shadow-[0_0_15px_rgba(98,250,227,0.3)] scale-105"
          : `bg-surface-container text-on-surface hover:bg-surface-container-high ${hoverClassName ?? ""}`
      }`}
    >
      {label}
    </button>
  )
}