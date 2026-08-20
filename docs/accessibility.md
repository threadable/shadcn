# Accessibility

Threadable's accessibility target is WCAG 2.2 Level AA. That target guides component semantics, keyboard interaction, focus management, validation relationships, visible focus styles and review priorities. It is not a claim that every component or consumer application conforms.

## Automated testing scope

The repository contains three complementary layers:

```sh
pnpm test:a11y       # Vue Test Utils accessibility regression tests
pnpm test:browser    # Playwright keyboard and browser interaction tests
pnpm test:axe        # @axe-core/playwright scans
pnpm test:harness    # Unit, browser and axe harness tests
```

`pnpm check` runs the harness as part of the full registry validation. The Vite playground renders every public item in separated, labelled cards with representative default, disabled, focused, invalid, open/closed, light/dark, long-content and mobile-width states. Each playground card owns its own props and model bindings so one example cannot silently change another.

Automated coverage includes:

- Accessible names and visible-label associations for controls.
- `aria-expanded`, `aria-selected`, `aria-checked`, `aria-invalid`, `aria-disabled` and related state changes.
- Enter, Space, Arrow-key and Escape activation where the component pattern requires it.
- Tab order, roving focus, focus movement, modal focus trapping and restoration.
- Overlay dismissal and tooltip/popover interactions.
- Disabled controls, validation text associations and error announcements.
- Reduced-motion preference behaviour for animated overlays and loading states.
- Axe scans of representative default and open-dialog playground states.

Automated axe results alone do not establish WCAG conformance. Axe cannot assess every content decision, interaction sequence, browser/screen-reader combination, contrast context, zoom level, touch target, focus-visible quality or product workflow.

## Manual release checklist

Review affected components in the playground and in a realistic consumer application:

- Confirm every control has a meaningful accessible name. Icon-only buttons need an accessible label; decorative icons need `aria-hidden="true"`.
- Confirm visible labels are associated with the intended input, select, checkbox, radio or textarea. Do not rely on placeholder text as the only label.
- Confirm descriptions and error messages are connected with `aria-describedby` or the component's documented association. Error content should explain how to recover.
- Navigate with Tab, Shift+Tab, Enter, Space, Arrow keys and Escape. Check logical order, no keyboard traps and a visible focus indicator.
- Open and close every dialog, alert dialog, sheet, dropdown, select, combobox, popover and tooltip. Check initial focus, trapping, Escape dismissal and focus restoration.
- Check disabled and processing states cannot be activated and are communicated to assistive technology. Do not use a visual opacity change as the only state signal.
- Check headings, landmarks, lists, tables, status messages, live regions and empty states for correct native or ARIA semantics.
- Test long labels, descriptions, errors, translations, zoom and narrow/mobile widths. Check that content is not clipped, obscured or dependent on colour.
- Review light and dark themes for contrast, focus visibility, hover/focus/selected/error differentiation and forced-colour behaviour where supported.
- Enable reduced motion in the operating system and browser. Confirm essential information, focus movement and dismissal remain available without relying on animation.
- Test loading, empty, invalid, selected, disabled and asynchronous states with realistic data and navigation history.
- Review consumer-supplied content, especially labels, `ariaLabel`, dialog titles/descriptions, link text and table column headers.

## Screen readers and browsers

Before a release, test the affected patterns with the versions supported by the consuming applications. The recommended baseline is:

- Chromium or Edge on Windows with NVDA; use JAWS for critical workflows when available.
- Safari on macOS with VoiceOver, including a narrow viewport and zoom.
- Safari on iOS with VoiceOver for touch, focus and viewport behaviour.
- Chrome on Android with TalkBack for touch and virtual-cursor behaviour.
- Firefox on Windows with NVDA for browser differences in focus and ARIA event handling.

Include keyboard-only, touch and screen-reader navigation. Test both the registry playground and at least one real consumer composition because portals, CSS, application landmarks and validation content can change the result.

## Known limitations

- jsdom and Vue Test Utils do not reproduce browser layout, portals, native focus timing, CSS transitions, touch interaction or assistive-technology output.
- Playwright verifies browser behaviour but does not operate a screen reader and does not replace manual touch, zoom, high-contrast or assistive-technology testing.
- Axe is a useful automated signal, not a conformance certificate. Passing the configured rules does not prove WCAG 2.2 Level AA conformance.
- The playground uses representative strings and data. Consumers must provide suitable labels, descriptions, error messages, translations, table headers, link text and business content.
- Reka UI, Vue, browser, Tailwind and screen-reader versions can affect behaviour. Dependency upgrades require the same release review as source changes.
- Contrast and target-size outcomes depend partly on consumer theme tokens, surrounding layout and application CSS.

The accessibility tests are guardrails for intentional behaviour. They must be combined with semantic review, manual keyboard testing, real-browser testing and assistive-technology testing before making a product accessibility statement.
