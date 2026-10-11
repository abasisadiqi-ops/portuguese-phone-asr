# v1.0.45 — conversation-first interaction-surface experiment

This is **executable HTML, CSS and JavaScript** on an isolated, draft-only GitHub branch. It is **not** a generated moodboard, marketing screenshot, image-generator output, or replacement for the already working v1.0.33 production phone site.

## Why another direction

The previous v1.0.39–v1.0.44 preview lineage kept oversized serif heroes, capital-letter micro-labels, staged magazine/AI-dashboard rhetoric and very long research forms. This made the **actual task of speaking** secondary on a phone. The user specifically rejected that aesthetic, repeatedly. Merely changing gradients, colors or faux editorial headings would repeat the mistake.

This implementation **discards that layout grammar**:
- The first screen is a usable conversation surface, not a product presentation.
- Microphone state, Start / physical Mute / End and a text composer sit above bottom navigation.
- The voice meter responds to real microphone amplitudes, not a cosmetic orb or autonomous animation.
- App structure is a five-workspace instrument: Talk, Speak, Read, Library, Settings. On desktop the dock shifts into a sidebar.
- Light and dark have their own semantic colors; Arabic and Hebrew examples use `dir=rtl`, actual `lang`, and user-entered messages use `dir=auto`.
- No copied template assets, remotely loaded fonts, images or libraries. Responsive CSS uses logical edges and reduced-motion support.
- Controls are at least 44 CSS px high with visible focus rings, text uses sensible sizes, and the conversation pane scrolls independently of the controls.
- Research language specimens are explicitly not historical attestations and cannot validate an ancient recording.

## What this code actually does

Talk: typed messages appear in a transcript view and **stay in volatile page memory**. They are not a generated AI dialogue. The preview intentionally has no ASR/LLM/TTS adapter. The browser requests microphone permission only after pressing Start, reads a real Web Audio level meter, and physically stops tracks on Mute, End, navigation away or backgrounding. Unmute requests a new microphone stream. Audio is not recorded or uploaded by this preview.

Read: switches source-script specimens (Greek, Arabic, Hebrew, Geʽez, Portuguese) with script-appropriate paragraph direction. Settings: system/light/dark appearance and reading-size preference. Library makes **no claim** to manage the main app's browser caches; Speak links to the production research app instead of faking model inference.

This is a UI **integration slice**, not yet a mergeable replacement for the production ASR app. Its visual architecture is intended to be integrated with the v1.0.43 Conversation state machine after direct owner review.

## Tests and previews

The local source was checked in Chromium at **320, 390, 768 and 1280 px**: navigation, dark/light, message handling, Arabic RTL, reading scaling, reduced-motion CSS, and no horizontal overflow. The browser in this environment blocks local HTTP/file URLs, so those local tests inject the exact source into a sandboxed Chromium document rather than navigating.

The GitHub Actions workflow `research-ui-v145.yml` instead serves the **committed files** on localhost in the GitHub runner and performs:
1. Eight *real screenshots* from actual Chromium rendering: 390px conversation light/dark, Greek/Arabic/Hebrew reading, dark settings, 320px phone and 1024px desktop.
2. A real Chromium fake-device microphone test where getUserMedia produces an actual MediaStream; after Mute the underlying track must be `ended`, Unmute must produce a *new* live track, and navigating to Read must end it.
3. Required eight-image artifact `verba-v145-actual-interface-light-dark-rtl` with 14-day retention. No public Pages deployment or neural inference.

**No live iPhone proof**, no real native speaker evaluation, and no claim of robust sound detection or seamless AI conversation. The existing native/ASR research must not be replaced by this isolated UI without integrating and rerunning the old test suite.

## Review criteria

Judge the **task** instead of the screenshot: Is the microphone reachable with one thumb? Are mute state and privacy obvious? Is the transcript legible with 200 turns? Do diacritics survive font fallback? Can an Arabic/Hebrew quotation coexist with an English shell? Does increasing text size preserve controls? Does the design still look like an AI-product ad? Treat negative feedback as a design gate, not a reason to recolor the same card-heavy screen again.

The production v1.0.33 PWA and open research PRs #2 (hands-free), #3 (historical Greek) and #4 (model quality) are **untouched**.
