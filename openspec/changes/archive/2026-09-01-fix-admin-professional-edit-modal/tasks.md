# fix-admin-professional-edit-modal Tasks

## 1. Reset form state on open

- [x] 1.1 In `ExperienceManager.tsx`, pass a `key` to `<PositionModal>` derived from the opened position id so the modal remounts (re-seeds its `useState` initializers) whenever a different position is selected or a new position is added
- [x] 1.2 Verify that opening the edit modal for any position auto-fills all fields (role, company, location, dates, current flag, bullets, tech stack) and opening it again for a different position repopulates with that position's data

## 2. Month and year date selectors in the modal

- [x] 2.1 Replace the free-text Start Date and End Date inputs in `PositionModal.tsx` with Month (January–December) and Year select dropdowns, seeded from the selected position's parsed `period`
- [x] 2.2 Preserve the Current Role checkbox behavior: enabling it disables the End Date selector and forces the end to "Present"
- [x] 2.3 Update `periodFor` (and the initial-date parsing) to compose the selected month/year into the existing `period` format ("Start — End" / "Start — Present"), keeping year-first, regex-compatible output so the public site's `parseYear` still works, and gracefully handling period values that contain only a year (no month)

## 3. Thread dates through the save flow

- [x] 3.1 Align `ExperienceManager.savePosition`'s parameter type with the modal's `onSave` payload by accepting `startDate` and `endDate`, and ensure the Edit branch correctly stores the month/year-derived `period` from the modal (no change to the `Experience` shape)
- [x] 3.2 Manually verify end-to-end: add a new position and edit an existing position in the admin Experience Manager, confirm dates are selectable by month/year, auto-fill is correct on edit, saving succeeds, and the list reflects the change

## 4. Validation

- [x] 4.1 Run the project's lint/typecheck to confirm the changes compile cleanly
