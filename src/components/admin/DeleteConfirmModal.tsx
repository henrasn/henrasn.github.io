import type { Experience } from "../../data/experience"

type DeleteConfirmModalProps = {
  position: Experience
  onClose: () => void
  onConfirm: () => void
}

export function DeleteConfirmModal({ position, onClose, onConfirm }: DeleteConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-[10vh]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface-container-low rounded-2xl border border-outline-variant/30 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20">
          <h2 className="font-[Space_Grotesk] text-[20px] font-semibold text-on-surface">
            Delete Position
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4">
          <p className="text-[14px] leading-[1.5] text-on-surface-variant">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-on-surface">
              {position.role}
            </span>{" "}
            at{" "}
            <span className="font-semibold text-on-surface">
              {position.company}
            </span>
            ? This action is permanent and cannot be undone.
          </p>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-[14px] font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg text-[14px] font-semibold text-on-primary bg-error hover:opacity-90 transition-opacity"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
