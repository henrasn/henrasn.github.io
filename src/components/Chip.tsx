export function Chip({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-[12px] font-semibold tracking-[0.05em] uppercase">
      {children}
    </span>
  )
}
