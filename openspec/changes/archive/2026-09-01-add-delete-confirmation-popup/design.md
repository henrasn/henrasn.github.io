# add-delete-confirmation-popup Design

## Context

See proposal.md for motivation. In the admin Experience Manager (`ExperienceManager.tsx`), each `PositionCard`'s Delete button calls `onDelete` → `deletePosition(id)`, which immediately filters the position out and persists the array via write-back — an irreversible, unconfirmed action. The project already uses a custom fixed-overlay modal pattern (see `PositionModal.tsx`) for the add/edit form.

## Goals / Non-Goals

**Goals:**
- Interpose a confirmation popup between pressing Delete and any removal/persistence.
- Make the popup identify the position being deleted (role/company) and provide explicit confirm and cancel actions.
- Keep deferred deletion: the existing `deletePosition` path and write-back behavior run only after confirmation.

**Non-Goals:**
- Changing write-back persistence or the `Experience` data shape.
- Undo/soft-delete or a trash mechanism — confirmation is the only safeguard.
- Altering the add/edit modal, the public timeline, or other position actions.

## Decisions

### 1. Add a dedicated confirmation popup component
Create a small `DeleteConfirmModal` component (co-located under `src/components/admin/`), reusing the existing fixed-overlay pattern (backdrop + centered card + close button) used by `PositionModal`. It receives the target position and callbacks, renders a warning-style title, the position identity (role at company), and two actions: an explicit **Delete** (primary/error) button and **Cancel**.

- **Why a dedicated component over a generic one**: the delete concern is specific (identify target + destructive action); a dedicated component stays minimal and avoids over-generalizing the existing `PositionModal`. Alternatives considered were a generic `ConfirmDialog` or inline `window.confirm` — the latter is rejected because it does not match the app's custom design language and cannot render the styled overlay.

### 2. Gate deletion behind confirmation state in the manager
`ExperienceManager.tsx` gains a `deleteTarget` state (an `Experience | null`). Pressing Delete sets `deleteTarget` to that position (instead of deleting immediately); the confirmation popup renders when `deleteTarget` is set. Confirm calls the existing `deletePosition(id)` and clears the target; Cancel/close clears the target without deleting.

- **Why manager-level state over passing confirm through `PositionCard`**: the delete/persist logic already lives in the manager; keeping the popup state there preserves the existing single-responsibility flow and avoids threading synchronous confirm semantics through `PositionCard`. The `PositionCard` Delete button is unchanged in behavior — it still fires `onDelete`, but the manager now treats that as "request confirmation".

### 3. Persisted only on confirm
Untouched behavior: `deletePosition` still filters the in-memory list and calls `persist`, which writes back. The only change is that it is invoked solely from the popup's confirm action.

## Risks / Trade-offs

- **Extra click for every delete** → Intended; this is the safeguard the change exists to provide. Mitigation: the popup clearly labels the confirm action as "Delete" so intent is explicit.
- **Popup dismissed by clicking backdrop** → Must not delete. Mitigation: backdrop/close/Escape semantics only clear `deleteTarget`; only the Delete button removes the position.
- **Potential layout divergence with existing modals** → Reusing the established overlay styling keeps it visually consistent with `PositionModal`.

## Migration Plan

No deployment or data migration — a UI behavior change in the dev-only admin portal. Rollback is reverting the component edits.

## Open Questions

None.
