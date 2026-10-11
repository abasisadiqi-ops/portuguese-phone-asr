# VERBA / Multilingual Master — Codex repository instructions

This repository is a **public** Portuguese speech PWA with draft research/design branches, not the entire private Multilingual Master. Production `main` must remain the previously user-tested v1.0.33 Tiny/Base app unless the user explicitly approves a separately tested release. Do not auto-merge or publish.

## Working baseline
- PR #2: voice-first, topic-free foreground conversation, genuine microphone Mute, ASR → local dialogue, storage and state-machine work; full phone app v1.0.43 remains draft.
- PR #3: Greek historical phonology research; period-specific witness/evidence ledger and real GitHub Chromium previews.
- PR #4: independent modern ASR, TTS and dialogue model-quality gates; **no pretrained model promoted or trained**.
- PR #5: new conversation-first v1.0.45 interface prototype; its HTML/CSS/JS must NOT be mistaken for an integrated Whisper/Qwen phone release.
- Source of truth for private originals is a separate migration archive, **not this public repository**.

## Development
1. Read `docs/CODEX_MIGRATION_2026-10-11.md` and the project migration bundle's `START_HERE.md` and `HANDOFF_CODEX.md` when accessible.
2. Keep stable app domains: ASR / LLM / TTS / VAD, conversation state, encrypted local clip vault, offline service worker, storage deletion policy, user presentation and multiscript reading. Improve them with small unit-tested PRs and real GitHub browser screenshots, **never ChatGPT-generated design mockups**.
3. User wants unprompted natural conversation, one foreground Start and actual Mute/Unmute, not push-to-talk on each turn. Handle permission races, background interruptions, old model responses, echo and noisy rooms honestly. iOS PWA cannot promise continuous off-app mic/inference.
4. Preserve authoritative private wake-relative 66-hour study programme, conditional 72-hour stretch, spaced review 1/3/7/14/30 days, original tutor and Socratic historical linguistic pedagogy. **Never award study credit automatically** or reset original state during refactor.
5. Modern Arabic/Hebrew/Greek/Ethiopic/Portuguese ASR/TTS is distinct from historical Hebrew, Greek and Geʽez vocalic reconstruction. Historical witnesses, datings, source limitations and alternative readings are mandatory. No invented ancient phonetic certainty or ancient TTS.
6. Target low-resource languages include Mehri/other Modern South Arabian, Amharic/Tigrinya/Geʽez, Malagasy, Southern African Bantu, Afrikaans, Syriac, and original Hebrew/Greek/Arabic target inventory.
7. Never place user voices, speaker IDs, personal study state, dictionaries/PDFs/other copyright-unreviewed material, model weights, private corpora or secrets in public Git. Keep private corpus vault separate. Use per-source explicit evaluation/training consent.
8. Tests and reproducible logs required. Synthetic browser/mocked neural tests cannot validate on-device Portuguese conversation or native Greek voice quality. Keep protected production unchanged until physical Safari release tests and user approval.

**Immediate goal:** consolidate into a dedicated **private** Git monorepo, preserving this public v1.0.33 production baseline. Integrate v1.0.45 design into v1.0.43 real conversation code only in small tested increments and with user-reviewed GitHub-rendered previews.
