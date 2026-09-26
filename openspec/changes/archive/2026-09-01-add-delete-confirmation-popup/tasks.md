# add-delete-confirmation-popup Tasks

## 1. Confirmation popup component

- [x] 1.1 Create a `DeleteConfirmModal` component under `src/components/admin/` reusing the existing fixed-overlay modal pattern, taking the target position and confirm/cancel callbacks and rendering a warning title, the position identity (role at company), a Delete (confirm) button, and a Cancel button

## 2. Gate deletion behind confirmation in the manager

- [x] 2.1 In `ExperienceManager.tsx`, add a `deleteTarget` state (an `Experience | null`) and render the confirmation popup when it is set, passing the target position and confirm/cancel handlers
- [x] 2.2 Change the position Delete flow so pressing Delete sets `deleteTarget` instead of deleting immediately, keeping `PositionCard`'s Delete button wired to `onDelete`
- [x] 2.3 Wire the popup's confirm action to call the existing `deletePosition(id)` and clear `deleteTarget`, and its cancel/close/backdrop actions to clear `deleteTarget` without deleting

## 3. Verification

- [x] 3.1 Manually verify end-to-end in the admin Experience Manager: pressing Delete shows the confirmation popup, Cancel leaves the position and list unchanged, and Confirm removes the position and persists it via write-back
- [x] 3.2 Run the project's lint/typecheck to confirm the changes compile cleanly
