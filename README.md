# Portuguese Local ASR Lab — phone-first deployment

## v1.0.36 pre-release redesign + separate historical Hebrew vocalic track

**Hold release.** The live GitHub Pages site continues to serve the previously verified v1.0.33 Tiny/Base phone app. v1.0.34 and v1.0.35 remain unshipped; this feature branch now stages the latest **v1.0.36** source and workflow. Its branch name keeps `v134` only for PR continuity. The ZIP required for CI is exactly `phone-asr-source-v136.zip` (SHA-256 `ddf803d9740b5de4eb19a4acca5cb820de50fbbbc7cc727123b0e9ce56ebbba6`). Older candidate ZIPs MUST NOT be uploaded.

Changes in the **public isolated phone source**: bespoke research-lab interface with offline-friendly CSS animations (paused while idle, reduced-motion support), safer visible state, anchor navigation, richer typography and model-choice transparency; 1 TB iPhone disk size explicitly **does not guarantee** enough RAM/CacheStorage. Whisper Small planning is research-only, with `uint8` ~238 MB vs `q8` ~475 MB distinctions and **no automatic model promotion**. Existing Tiny/Base inference is preserved. The cache-first service worker and corpus audits remain included. **75/75** Node tests and **2/2** existing 390px Chromium flows plus responsive/reduced-motion checks passed locally. No model was trained and no new language enabled.

The **private master** separately adds an historical Hebrew vowel-evidence lab: Iron Age, Second Temple, Tiberian, Palestinian, Babylonian and Samaritan evidence kept chronologically distinct. No historical pronunciation is inferred from consonantal spelling, no neural Hebrew ASR or synthetic ancient audio is claimed. Its source and personal research data **must never be copied to this public repository**. It has ten passing Node tests and an independent mobile Chromium synthetic-evidence rejection test.

Design inspiration was researched, not copied: [Motion](https://www.motion.dev/) (MIT), [Lucide](https://github.com/lucide-icons/lucide) (ISC), [Noto Hebrew](https://github.com/notofonts/hebrew) (OFL), [ShadCN MIT layout template](https://github.com/shadcnstore/shadcn-dashboard-landing-template). No third-party fonts/images/libraries were added to the candidate site.

**GitHub CI, production Vite build, and physical iPhone v1.0.36 behavior remain unverified.** This PR stays draft, feature-branch Pages deployment is prohibited, and the new source ZIP is still awaiting upload from iPhone. See `DESIGN_AND_MOTION.md` and `MODEL_RESEARCH_v136.md` after the ZIP is uploaded.


## Hold release: v1.0.35 combined offline-startup + ASR data-science candidate

**v1.0.34 will not be separately published.** The user requested improving model choice, training-data quality and harder language coverage before the next release. Draft PR #2 now stages the combined v1.0.35 candidate. The branch retains its earlier v134 name for review continuity; the only valid archive to upload is `phone-asr-source-v135.zip` (SHA-256 `a967ab746ff300735e99149433d5b001b378437b7aeb190076e44a56944949b8`), not the superseded v134 archive.

The combination preserves the **unpublished** cache-first startup change and read-only iOS navigation diagnostics. It adds orthography-preserving grapheme CER alongside WER, a language token-vs-verified capability registry (Arabic/Modern Greek/Hebrew/Amharic/Malagasy research targets; Tigrinya/Geʽez/Ancient Greek not passed off as supported), an offline corpus aggregation CLI, privacy-gated phone-export review importer, synthetic manifest fixtures, explicit rights/consent/speaker/session split-leakage checks, and a model decision hold gate until sufficient independent paired clips exist. Training is **NOT** performed, Whisper Small is **NOT** enabled, and the iPhone app remains **Portuguese-only**.

Local tests: **70/70 JavaScript unit tests**, **2/2 Chromium 390px mock-model interaction tests**. **GitHub Vite production build, cache-first iPhone cold-start speed, other languages' on-device inference, and any trained model are unverified.** The feature workflow will check the exact ZIP checksum, run tests and a synthetic-data-only audit, compile production assets, and **cannot publish from this feature branch**. Keep manual `deploy_pages=false`.

Do not upload recordings, private transcripts, speaker identities, or original Multilingual Master files to this public repository. The public sample corpus file contains invented hashes and generated labels only. See `TRAINING_AND_MODEL_DECISIONS.md` inside the candidate archive for evidence/training policy. The verified live v1.0.33 Tiny/Base website and separate manually authorized Tiny rollback flow remain unchanged.


## v1.0.34 candidate: fast offline app-shell startup (NOT YET PUBLISHED)

**Corrected user observation:** the installed Home Screen **app itself** required roughly 1–3 minutes to reopen in Airplane Mode with Wi-Fi switched off; **Whisper Base loaded in under 10 seconds after the app appeared**. Previously conflating those two latencies was incorrect. Both Whisper Tiny and Base inference were user-observed after offline restarts; network state remains independently `NOT_ATTESTED`.

**Hypothesis:** v1.0.33's service worker tries a navigation network request before its cached HTML and can therefore wait for an iOS offline request timeout even with the complete shell cached. This is a code-path diagnosis, not a measured profiler trace.

**Patch and measurement:** v1.0.34 returns the version-matched cached HTML immediately, retaining all existing WASM precaching, Hugging Face model cache, recording and zero-learning-credit policies. A new read-only startup export reports Navigation Timing, a cache-first worker-version handshake, and an unverified online hint. It does not time iOS process launch or independently certify Airplane Mode.

**Verified locally:** 54/54 JavaScript tests and two Chromium 390px UI tests (neural inference mocked). **GitHub production build and faster iPhone offline cold-start remain unverified.** The candidate artifact expected at the feature branch root is `phone-asr-source-v134.zip`, SHA-256 `6abeb868773aad1374d899973499d77700aa6d896de3a779728e48d8d334b34f`.

**Rollout gate:** upload v134 ZIP on `feature/offline-cache-first-startup-v134-20261010`; manually run `Build or publish Portuguese ASR PWA` on the branch with `deploy_pages=false`. Publishing from a feature branch is prohibited at workflow level. Only consider merging after 54/54 CI tests and production build pass. Merge does not publish; a separate manual `main` deployment opt-in is still necessary. Keep the working Tiny/Base Pages site live until then. `Restore verified Tiny-only` remains separate and manual.

After publishing, load the new app **online twice** so a waiting service worker can activate without forced tab replacement. Close the Home Screen app, switch to Airplane Mode with Wi-Fi off, reopen, measure wall-clock startup and export `portuguese-asr-startup-diagnostics.json`. Confirm `cache_first_worker_verified:true` before drawing a speed conclusion. Do not clear model data.


## v1.0.33 candidate: Tiny / Base comparison (review before deployment)

The **live Pages site still uses the previous Tiny-only release**. A separate feature branch proposes Whisper Base alongside Tiny with **same-recording** comparison, optional **user-entered** reference transcript, transparent word-error rate (Portuguese accents preserved), per-model latency and manual JSON export. Models load **sequentially** to reduce memory use. No model may score or credit learner hours.

**User-observed milestone:** The earlier Tiny CPU/WASM site reportedly transcribed a Portuguese sentence after a physical iPhone Home Screen cold reopen in Airplane Mode with Wi-Fi off (1.469 s). This was not independently network-attested and does not establish Base offline performance.

**To trial the candidate without replacing the working app:** Upload the independently supplied `phone-asr-source-v133.zip` to the `feature/whisper-base-same-clip-v133-20261010` branch root (not the private master repository). The workflow on that branch verifies SHA-256 `4cfb32e971eca6a1539f42545d99a575b2dc73302af7f9b947eefb7e8c4d9184`, executes 45 JavaScript tests, compiles the app, checks the Base UI and model bundle, and uploads the build artifact. Run with `deploy_pages=false`; the live site must not change until this succeeds. Source-only and mocked-browser tests do **not** prove real Base iPhone inference. After reviewing the PR and testing, a deliberate separate Pages deployment can be authorized.


**Scope:** a public, isolated experiment for local Portuguese speech recognition in iPhone Safari. This repository intentionally does not contain the private Multilingual Master archive, learning history, recordings, speaker identifiers, model weights, or study progress.

## State as of 10 October 2026

- The **same isolated source ZIP** passed 35 JavaScript tests and a real Vite production build in the private repository's GitHub Actions run [#38043829866](https://github.com/abasisadiqi-ops/arabic-audio-lab/actions/runs/38043829866). That result is not an iPhone inference test.
- This public repository contains a SHA-256-pinned copy of `phone-asr-source.zip`, sourced from the existing private repository without copying any master learning records.
- Actual on-device model inference, Portuguese recognition accuracy, and offline persistence after a Safari/Home Screen restart are **not yet verified**.

## Publish from an iPhone — no Mac, Xcode, or native signing

1. On GitHub, open **Settings → Pages** for this public repository. Set **Source → GitHub Actions**. Do not change the private master repository's visibility.
2. Open **Actions → Build or publish Portuguese ASR PWA → Run workflow**. Use branch `main` and explicitly set `deploy_pages = true`.
3. Wait for the `build` and `publish` jobs to finish. If either fails, inspect the workflow logs and fix the cause before claiming deployment.
4. Open the GitHub Pages HTTPS URL reported by the successful `publish` job in **Safari**. Use **Share → Add to Home Screen**, then open the installed web app.
5. For the first experiment, select **CPU / WASM**, download **Whisper Tiny multilingual** while connected to Wi-Fi, record or import a short Portuguese sample, and transcribe online.
6. Enable **Airplane Mode**, switch Wi-Fi **off**, fully close and reopen the Home Screen app, then transcribe a **different** short sample using the same backend. A working offline splash screen is not proof the speech model works offline.
7. Export the JSON observation. It is a diagnostic only: it does not certify airplane mode, determine a PT-PT/PT-BR accent, or grant study hours.

## Privacy, limits, and source integrity

- This is a **public repository and potentially a publicly accessible website**. No secrecy or obscurity is assumed.
- The app processes imported audio in the browser. It does not intentionally send recordings to a server, but it fetches model files from Hugging Face during initial setup, and iOS/browser-level network behavior has not been audited by packet capture.
- iOS may evict browser cache; CPU and GPU downloads can be different. Offline inference needs to be re-proven after browser updates or cache loss.
- The app currently transcribes Portuguese with `onnx-community/whisper-tiny`, and the PT-PT / PT-BR selector labels evaluation datasets rather than classifying accents.
- The workflow checks the source ZIP SHA-256: `ca00f08b5c3319a1cfb7101cd69300d2dcacdf9fd6cf9f6bc0b8de5684a06a2f`. Modified source requires an audited update of this pinned digest.
- No test result, transcript, synthetic audio or ASR receipt automatically changes the authoritative 66-hour learning programme.

**This app is experimental.** A successful GitHub build or successful online inference is not evidence of a fully offline iPhone speech tutor.
