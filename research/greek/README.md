# Greek Sound Archive v0.1 — an independent historical research lane

**Status:** Unreleased, research-only. No neural speech model, historical voice synthesis, validated pronunciation output, training dataset, or automatic learning credit. This is NOT a refactor or deployment of the already working Portuguese Tiny/Base phone app.

The user requested a **separate Greek historical-reconstruction lane**, analogous in evidential discipline—but **not phonologically identical**—to the independent Hebrew and Geʽez projects. The distinction is critical: the Greek alphabet and polytonic marks preserve literary/orthographic traditions, not a surviving ancient sound recording. Mycenaean Linear B is a *different syllabic script*. Classical Attic, Hellenistic/Roman Koine, Byzantine Greek, and regional/modern Greek require distinct arguments.

## What the GitHub code actually does
- Eight periods: Mycenaean; Archaic; Classical Attic; Hellenistic Koine; Roman Koine; Late Antique; Byzantine; and Modern.
- Safe in-browser witness registration: an identified source, evidence type, independent date/period, explicit synthetic flag and explicit citation-review flag.
- Manually entered IPA *hypotheses* must explain their phonetic argument and limitations and cite non-synthetic, reviewed witnesses. Even then the hypothesis remains unverified and requires independent expert review.
- Erasmian classroom conventions and present-day Greek pronunciations are **not** substituted for pre-modern speech. Modern recorded evidence may support a modern reading but cannot alone ground classical phonology.
- Dossier creation and JSON export use client-side memory and an explicit local download. No network upload of entries, automatic persistence, generated speech, study credit, or machine-learning authorization.
- Original authored HTML/CSS for a reading-oriented interface; light/dark view and 320/390/1280-pixel test sizes. No generated design images, images from ChatGPT, copied themes, third-party fonts or online UI dependencies.

## Evidence and source distinctions
### Public scholarly reference leads
1. Morpurgo Davies, “Pronunciation, Greek,” *Oxford Classical Dictionary*: https://academic.oup.com/edited-volume/61673/chapter-abstract/548060197
2. Probert and Roussou (2019), “The invention of the Greek prosodic signs”: https://ora.ox.ac.uk/bookmarks/uuid%3A9dc444a5-0e75-4947-99fa-37e80d71235f
3. Probert (2006), *Ancient Greek Accentuation*, evidence chapter: https://academic.oup.com/book/10118/chapter-abstract/157606603
4. Modern research on regional Koine variation: https://www.cambridge.org/core/journals/cambridge-classical-journal/article/sound-of-attic-the-fabric-of-linguistic-imitation-in-greek-imperial-texts/339CD76AF8B6D68A99FD96443FB5F404

### Existing private project PDFs — not republished
The preexisting user-provided `Greek.zip` contains Stephen Colvin's “The Greek Koine and the Logic of a Standard Language” (2009) and Maria Poulopoulou's *Modern Greek: Grammar Notes for Intermediate Learners*, among other texts. Colvin provides sociolinguistic context for a common language; Poulopoulou is a modern grammar learning resource. **Neither is a direct audio record of Classical Attic or Koine.** This public project copies no source PDF text, scanned pages or copyrighted figures.

## GitHub verification and real previews
`phonology.mjs` is the public-safe fail-closed evidence policy. Run `node --test research/greek/phonology.test.mjs`. The automatic branch-only `research-greek-v144.yml` workflow will also serve this **committed** interface over HTTP to Chromium, exercise document/witness/hypothesis interactions, verify light/dark and responsive overflow, then produce **eight real browser screenshots** under artifact `greek-v144-chromium-previews` (14-day retention). An additional `greek-v144-source-preview` artifact contains the source, **not a public Pages deployment**.

This Greek branch is isolated from the existing draft continuous-conversation branch. **Do not merge into `main` or publish to Pages** until real screenshots, historical methodology and reviewer feedback are accepted.

## Follow-up research priorities
Use date/region/dialect metadata for inscriptions and documentary papyri, map dialectal merger chronology feature by feature (quantity, aspiration, voicing/fricativization, vowel raising/mergers, pitch-to-stress changes), compare Classical Attic and regionally distinct Koine without false uniformity, and keep *teaching convenience* distinct from *historical reconstruction*. A future human-reviewed TTS corpus must never use these unverified hypotheses as authoritative machine-training labels.
