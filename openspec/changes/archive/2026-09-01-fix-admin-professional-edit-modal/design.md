# fix-admin-professional-edit-modal Design

## Context

See proposal.md for motivation. The edit/add modal (`PositionModal.tsx`) is always mounted by the Experience Manager and toggled via `open`/`initial` props. Its form field values are seeded from `useState(initial?.xxx)` initializers, which run only on first mount — so switching positions while the modal stays mounted leaves stale, unfilled fields. Start/end dates are plain free-text inputs that compose into a `period` string ("Start — End" / "Start — Present") consumed by the public site and write-back persistence.

## Goals / Non-Goals

**Goals:**
- Auto-populate the modal with the currently selected position's data every time it opens for an edit.
- Replace free-text start/end date inputs with a month + year selector while keeping the `period` string format unchanged.
- Thread the selected month/year through the save handler into `ExperienceManager.savePosition`.

**Non-Goals:**
- Changing the persisted `period` format or the data file schema.
- Redesigning the add/edit modal layout beyond the date fields.
- Altering write-back persistence or the public timeline.

## Decisions

### 1. Reset form state when the modal opens for a different position
The root cause is `useState` initializers running only once. Two viable approaches:

- **Remount key**: Give the modal a React `key` that changes per opened position (`key={modal.position?.id ?? "new"}`). Remounting re-runs the `useState` initializers, preserving the existing seed-from-`initial` logic with minimal code churn.
- **Synchronize on open**: Add a `useEffect` watching `open`/`initial` that resets every state field when the modal transitions to open.

**Chosen: Remount key.** It is the smallest, least error-prone change: the existing `useState(initial?.…)` seeding logic is already correct; remounting simply guaranteed it runs for each new selection. A `useEffect` would require listing and resetting every field consistently and risks subtle drift. Applied via the `key` prop passed to `PositionModal` in `ExperienceManager.tsx`.

### 2. Month and year selector for dates
Replace the two free-text inputs with custom select dropdowns: a **Month** select (January–December) and a **Year** select. The date values are represented as `{ year: string; month: string }` (month as a zero-padded numeric `MM` for unambiguous storage), then composed into the `period` string.

- When a position's existing `period` is parsed, the year is extracted from the date segment and the month maps from the month name/segment back to a select option. If the period only contains a year (e.g. `"2021"`), the month defaults to an unset/"—" option while the year is still selected.
- The "Current Role" flag continues to disable the End Date selector and forces end to "Present".
- `periodFor` is updated to accept the month/year selection and emit `"YYYY-MM — YYYY-MM"` (or a year-only form when the user did not pick a month) so the public site's existing year-based parsing (`parseYear` matching `\d{4}`) keeps working.

### 3. Thread dates through the save handler
`ExperienceManager.savePosition` currently omits `startDate`/`endDate` from its parameter type while `PositionModal` sends them. The handler's parameter type is updated to match the modal's `onSave` payload (adding `startDate`/`endDate`), and the manager's Edit branch maps the month/year selection back into the `period` string it stores (already handled inside the modal via `periodFor`). No change to the `Experience` shape — `period`/`current` continue to drive rendering.

## Risks / Trade-offs

- **Month/year representation vs. current year-only data** → Existing data like `"2021 — Present"` has no month; the selector must gracefully handle a missing month (default month option) so opening such an edit doesn't corrupt fields. Mitigated by allowing an empty month option and only emitting month when chosen.
- **Changing compose format** → If the period string format were changed, `parseYear` and the public timeline could break. Mitigated by keeping the year-first regex-compatible format and defaulting to year-only when no month is selected.
- **Remount resets the error state** → Acceptable; per-position state should be fresh, and `error` re-seeding to `null` is correct behavior.
