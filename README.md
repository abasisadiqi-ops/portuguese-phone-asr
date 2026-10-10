# Portuguese Local ASR Lab — phone-first deployment

## v1.0.40 — open conversation + opt-in local voice turn (draft, NOT deployed)

The owner wants a genuinely **free-verse, natural dialogue** rather than lessons with assigned topics, especially for languages whose speakers are hard to find. The isolated public app source now includes an *experimental* Conversation workspace in which the user can freely introduce/abandon any subject; there is no grading, auto-correction, canned simulated partner, auto-credit, or default transcript persistence.

**Actual architecture:** optional user-loaded `onnx-community/Qwen2.5-0.5B-Instruct` with Transformers.js WebGPU `q4f16` for text replies (device performance, speaking quality, offline behavior, model download and cache are **not yet iPhone verified**). Optional microphone turn requires existing Whisper Tiny/Base to be loaded in Speak, uses a shared microphone lease and real MediaRecorder, hands decoded speech to the local engine via a same-page event, then populates an **editable unverified draft**. Only a separate **Send** user action passes that text to the local generative model. No simultaneous foreground microphones, no auto-send, no audio upload/storage and no invented fallback response. Optional exact-locale device TTS is user-triggered; native voice quality/offline status NOT attested.

**Languages:** pt-PT and pt-BR are only **experimental dialogue candidates**, not validated native-quality Portuguese conversation. Mehri, Shehri, Soqotri, historical Hebrew, Geʽez, Southern Bantu languages, Afrikaans and other requested targets stay in the separate research/evaluation registry, **not silently enabled for generated conversations** without appropriate human-reviewed competence and pronunciation data.

**Recorded browser verification:** local 135/135 Node tests; five Chromium tests including real encoded browser microphone audio, editable transcription review, mock conversational model with two-turn context, background interruption discard, and existing ASR/comparison/storage/theme tests. 164 other project regression tests separately passed (299 total), including the original 66-hour wake-relative learner and private Hebrew/Geʽez research. These tests do NOT exercise real Whisper/Qwen inference or prove Safari off-app processing.

**Upload gate:** owner uploads `phone-asr-source-v140.zip` to feature branch root `feature/offline-cache-first-startup-v134-20261010`. SHA-256 **`45ee781103f03b538b02ae2a6787fc458c41a3a237aa5ea7a3323a633e9c0d9e`** (81 isolated source files; no private Master). Candidate workflow checks checksum, Node suite and compiled source features. **Feature-branch publication is prohibited**, and ZIP has not yet been uploaded. Public site remains proven v1.0.33 Tiny/Base. Do not merge/publish before GitHub production build and human device review.

The owner explicitly does **not** want ChatGPT-generated design imagery or native ChatGPT mockups. Visual work should occur only in code and real browser/device testing, without using image-generation output as evidence of quality. See `CONVERSATION_AND_VOICE_ARCHITECTURE_v140.md` inside the source ZIP.


## v1.0.39 — VERBA visual, multiscript and data contracts (DRAFT, not deployed)

**This supersedes all earlier candidate v134–v138 source ZIPs in this draft PR.** The only file to upload is `phone-asr-source-v139.zip` to feature branch `feature/offline-cache-first-startup-v134-20261010` (historical branch name retained for review continuity); SHA-256 `d4d1cce9f61e521db57b9e629e972a257afa915ad01af5a2c2869959da4bc12d`.

**As of preparation the file is NOT on GitHub, GitHub Vite production build has NOT run, and the public site remains the user-verified v1.0.33 Tiny/Base release.** Feature branch Pages publication is hard-blocked, even if the dispatch switch is enabled. Owner should dispatch with `deploy_pages=false` only after uploading the exact ZIP.

The candidate is a serious interface reset, not another gradient sticker: **one CSS system** replaces legacy dark inline CSS and stacked overrides; distinct semantic light/dark palettes with user override and system-following; academic serif/sans typography; adjustable reader type; an accessible five-anchor flow with actual PCM waveform; script specimen reader with explicit `lang` + `dir` for Arabic/Hebrew/Ethiopic/Greek/Portuguese, and source warnings so typography is not confused with historical phonology. **The English shell remains LTR; this is NOT yet a fully localized RTL interface**. Reduced motion and 320/390/768px responsive testing included. No third-party templates, fonts, voice recordings or private study files in the public source.

Modular additions: `src/ui_preferences.mjs` (allowlisted, non-sensitive namespaced UI preferences and safe storage fallback), `src/script_text.mjs` (unverified constructed specimens), `src/presentation.mjs` (theme and direction, without direct access to Whisper/MediaRecorder), `src/data_contracts.mjs` (storage classes + fail-closed *deletion planning* metadata—not a claim of physical erasure). Existing ASR, corpus audit, 66h authoritative tutor, encrypted clip vault, model/cache-deletion implementation and cache-first SW preserved. No new ASR model, corpus training, ancient pronunciation reconstruction or native background audio is claimed.

**Validated locally:** 114/114 Node tests + four browser tests: synthetic real WAV decode, browser MediaRecorder oscillator, mock Tiny/Base same-audio comparison, simulated CacheStorage deletion, and the light/dark/RTL/reduced-motion layout test. Total other verified test suites 164, yielding 278 across enumerated suites. These are not iPhone model/runtime tests. The local npm registry is unavailable (`EAI_AGAIN`), so the production Vite build must be proven via GitHub CI.

See `DESIGN_SYSTEM_v139.md` and `ARCHITECTURE_FOUNDATION_v139.md` in the new ZIP. This public repository remains separate from the PRIVATE Geʽez/Hebrew research modules and original user study data.


## v1.0.38 (candidate) — storage, deletion, privacy and lifecycle, no release yet

Owner prioritizes fundamental architecture, not another premature public release. The working public website remains **v1.0.33**. This branch now tests **v1.0.38** (old branch name retained). Expect **`phone-asr-source-v138.zip`** SHA-256 **`002e169d7950c06346c2869849bd996985970b0ac403d1042fae204f885b44c2`** in this feature branch root. Do NOT upload this private Multilingual Master ZIP or a personal recording. ZIP not yet uploaded; GitHub CI and actual Safari execution remain unverified.

This candidate provides: an origin-scoped CacheStorage/IndexedDB/OPFS names-only inventory; estimated quota/persistence request; explicit user-triggered **AES-GCM passphrase-encrypted single recording save/reload/delete** in IndexedDB; typed **`DELETE SAVED CLIP`** confirmation; typed **`DELETE SHARED MODEL CACHE`** confirmation for possible model CacheStorage entries, carefully preserving the versioned offline app shell and unknown caches. CacheStorage deletion is **not** complete model erasure (weights may live in IDB, OPFS or HTTP cache). Other repositories on the same `github.io` origin could share caches, thus the explicit SHARED warning. Lost passphrases have no recovery; offline data may still be evicted. The app never saves voice by default. See `STORAGE_AND_DELETION_ARCHITECTURE.md`.

An actual sample-derived waveform replaces the decorative one; advanced research and setup instructions use progressive disclosure. Frontend logs visible/hidden transitions and stops recording when notified it became hidden. There is an opt-in **foreground-only** Screen Wake Lock where supported. **A Home Screen PWA cannot reliably keep microphone/Whisper processing running in the background or after force-quit.** A separate PRIVATE native iOS architecture track will investigate legitimate AVAudioSession active recording during screen lock, signed native builds and entitlements. Web Push requires user permission and a server; it does not provide continuous offline work. See `BACKGROUND_AND_NATIVE_ROADMAP.md` and `PRODUCT_DESIGN_RESEARCH_v138.md`.

Local source verification: **94/94 Node tests**, **3/3 Chromium 390px browser workflows** (PCM decode and MediaRecorder real, model inference mocked, origin CacheStorage simulated). AES-GCM saving/decrypting and IndexedDB transaction semantics are tested using Node WebCrypto plus an evented fake IDB; **real origin IndexedDB and iPhone persistence are NOT attested** due to administrator restrictions on local browser navigation. Historical Hebrew/Geʽez, original 66-hour state and tutor remain private and intact. No model training, no new phone-enabled languages, and no study credit.

The source workflow is SHA-pinned and **feature-branch publishing is prohibited**. Only manual `main` workflow with explicit deployment can replace public Pages, after separate approval. The original verified Tiny-only rollback workflow remains in `main`.


## v1.0.37 — editorial UI redesign and expanded language research (NOT DEPLOYED)

**Design correction requested by owner:** previous v1.0.36 was too AI-dashboard-like. v1.0.37 is an editorial instrument with light paper-toned surfaces, strong serif typography, hairline section dividers, square input controls and restrained terracotta recording cue. No copied themes, templates, remote fonts or images. The only animated visual responds to actual recording; reduced-motion support remains. Tested in 390px Chromium, **not yet in Safari on iPhone**.

The public **Portuguese-only** research app includes a disabled-for-ASR registry of **six Modern South Arabian targets** (Mehri, Shehri/Jibbali, Soqotri, Harsusi, Hobyot, Bathari); **nine Southern African Bantu targets** (Sepedi/Northern Sotho, Sesotho, Setswana, Tshivenda, Xitsonga, isiZulu, isiXhosa, siSwati, isiNdebele); and **Afrikaans**, correctly classified as West Germanic and possessing a Whisper `af` language token without phone validation. These are documentation/benchmark targets, not selectable production languages or trained models.

The **private Multilingual Master** has an independent Geʽez vowel archaeology workspace, with earlier consonantal epigraphy, later vowel-order fidäl writing and living Ethiopian/Eritrean liturgical renditions separated. This history module is **NOT included here**. Neither automatically restores ancient vocalization nor authorizes ASR training, and must not be imported into the public repository.

**Gate:** feature branch (historic name `feature/offline-cache-first-startup-v134-20261010`) expects `phone-asr-source-v137.zip` SHA-256 `c1217ab9ae0d46fe6e039c6d42584dc7ab7af6c4174b11f11fe7502c821d45d7`. ZIP is **not yet uploaded**, GitHub production build **not yet run**, feature-branch Pages deployment **prohibited**, and public site remains the working v1.0.33 Tiny/Base release. Local source has **82/82** Node tests and two real-Chromium mock-inference UI checks, plus 12 separate private Geʽez and 10 Hebrew tests. No model training, no new language phone-enabled. Source includes design notes, language/data rights leads and a staged 1–3 month to 24–60+ month dependency-based schedule.


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
