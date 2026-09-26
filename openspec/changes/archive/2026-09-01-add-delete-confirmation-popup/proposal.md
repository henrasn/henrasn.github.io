# add-delete-confirmation-popup

## Why

The admin Experience Manager deletes a position immediately when the Delete button is pressed, with no way to undo and no warning before an irreversible, persisted change. Without confirmation, a stray click can permanently remove a professional role from the committed data file.

## What Changes

- Show a confirmation popup before deleting a position in the Experience Manager instead of deleting instantly.
- The popup identifies the position being deleted (role/company) and offers explicit confirm and cancel actions.
- Deleting occurs only after the user confirms; canceling or dismissing the popup leaves the list unchanged.
- The existing delete + write-back persistence behavior remains unchanged after confirmation.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `admin-portal`: The Experience management page's position-delete behavior is changing so that pressing Delete opens a confirmation popup, and a position is removed and persisted only after explicit confirmation.

## Impact

- `src/pages/admin/ExperienceManager.tsx` — intercept the delete trigger, open a confirmation popup with the target position, and only call the existing delete/persist path after the user confirms.
- `src/components/admin/PositionCard.tsx` — the Delete button now triggers the confirmation flow rather than deleting immediately.
- A new confirmation popup component (reusing the admin modal overlay pattern) for the delete action.
- No changes to write-back persistence, the data file schema, or the public timeline.
