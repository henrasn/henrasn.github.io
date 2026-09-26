# fix-admin-professional-edit-modal

## Why

The admin Experience Manager's edit popup does not auto-fill when editing an existing position: because the modal stays mounted and is toggled via props, its `useState` initializers run only once, so fields keep stale data from the previously opened position. Additionally, start/end dates are treated as single free-text inputs rather than month/year selectors, and the data shape passed on save does not align between the modal and the manager's handler.

## What Changes

- Fix the edit popup so its form fields are re-initialized from the currently selected position every time it opens, auto-filling role, company, location, start/end dates, Current Role flag, bullets, and tech stack.
- Add a month/year selector for the Start Date and End Date fields instead of plain free-text inputs (kept as a month + year choice), while preserving the existing "Current Role" behavior that clears/disables the end date.
- Ensure the Start Date and End Date values (month and year) are propagated through the save flow and composed into the existing `period` string ("Start — End" / "Start — Present") in the same format the public site and write-back persistence already use.
- Keep validation and write-back persistence behavior unchanged.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `admin-portal`: The Experience management "Add/Edit form" behavior is changing so that editing a position auto-fills the modal with the current data, and start/end dates are captured via month/year selectors rather than free-text inputs, with the dates flowing correctly through the save handler.

## Impact

- `src/components/admin/PositionModal.tsx` — reformat date inputs into a month/year selector and re-initialize form state each time the modal opens for a different position.
- `src/pages/admin/ExperienceManager.tsx` — update the `savePosition` handler signature to accept and forward start/end month-year values.
- `src/data/experience.ts` / `experience.json` — the persisted `period` string format is unchanged; date selector values are composed into that same format.
- No changes to write-back persistence, the public timeline, or the data file schema.
