# dikshat-resort reviewer notes

## Architecture

This is a static resort website with browser-side JavaScript and no visible backend, build system, or framework. Behavior is split by page concern: `js/main.js` handles navigation, scroll reveal, and contact submission; `js/booking.js` handles booking calculations; `js/extras.js` contains the lightbox, FAQ, theme, and scroll-spy features. Scripts interact directly with DOM elements identified by fixed IDs, classes, and section anchors.

## Conventions

- Use plain browser JavaScript with top-level DOM queries and event listeners; do not introduce framework abstractions without a clear need. Examples include `document.getElementById(...)` in `js/booking.js` and `document.querySelectorAll(...)` in `js/main.js`.
- Keep feature logic grouped in the relevant file. Booking state and validation belong in `js/booking.js`; shared visual/site interactions belong in `js/extras.js` or `js/main.js`.
- Use `const` by default and `let` only for mutable state, such as `current` in `js/extras.js` and `saved` in its theme initialization.
- Prefer small named functions for stateful behavior and UI updates, e.g. `nightsBetween`, `showSummary`, `openLightbox`, `closeLightbox`, and `applyTheme`.
- UI state is represented with CSS classes, attributes, and document data attributes rather than duplicated JavaScript state: `.open`, `.show`, `.visible`, `aria-expanded`, and `document.documentElement.dataset.theme`.
- Event handlers are attached directly to controls and collections. Keyboard support is implemented explicitly for interactive tiles and the lightbox (`Enter`, `Escape`, `ArrowLeft`, and `ArrowRight`) in `js/extras.js`.
- Preserve existing DOM contracts when editing markup: IDs such as `booking-form`, `checkin`, `checkout`, `booking-summary`, `nav-links`, `theme-toggle`, and `back-to-top` are required by the scripts.
- User-facing currency formatting uses Indian locale conventions: `toLocaleString('en-IN')` and the `₹` symbol in `js/booking.js`.
- Theme persistence is best-effort. `localStorage` access is wrapped in `try/catch` so unavailable storage does not break initialization (`js/extras.js`).

## Intentional non-standard choices

- Forms are demo interactions only: both contact and booking submissions call `preventDefault()`, show an `alert`, and reset the form (`js/main.js`, `js/booking.js`). Do not flag the lack of API submission unless backend behavior is explicitly being added.
- The lightbox is generated dynamically with `document.createElement` and `innerHTML`, and displays tile text plus a CSS custom-property color rather than loading image assets (`js/extras.js`).
- Theme preference is applied immediately from saved storage or `prefers-color-scheme`; failure to access storage is intentionally ignored.

## Watch out for

- New or renamed markup IDs/classes can silently break initialization because scripts assume queried elements exist; verify all selectors used in `js/main.js`, `js/booking.js`, and `js/extras.js`.
- Booking validation must continue rejecting zero or negative nights. Changes to date arithmetic should account for the existing `MS_PER_DAY` calculation and check-in/check-out minimum handling.
- Avoid introducing unsanitized HTML into dynamic UI. The current lightbox uses `textContent` for tile content; preserve that safety property.
- Preserve keyboard and accessibility behavior when changing interactive controls, including dialog attributes, tile `tabIndex`, `aria-expanded`, and Escape/arrow-key handling.
- Changes to scroll observers or dynamically added sections should not leave stale observers or assume every section has an `id`.