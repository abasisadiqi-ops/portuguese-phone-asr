# Codex / ChatGPT Work migration — 11 October 2026

This is the **public-safe GitHub handoff**, committed to a development branch (NOT production). The downloadable **private** project migration package contains the original tutor state and historical scholarly reference index; do not copy that entire package to this public GitHub repo.

## Recommended operating model

1. Use **Codex Cloud** to maintain a repository, refactor architecture, run Node/Playwright/Swift/Python tests, review diffs and open small PRs. If using an iPhone, create/configure a Codex Cloud environment from the supported web/desktop setup first, then use remote tasks where available.
2. Use **ChatGPT Work** for cross-language research, rights/provenance audits, code/research coordination and document work. Run it inside the existing ChatGPT Project context to keep relevant source files in scope.
3. Create a *new dedicated private GitHub repo* named e.g. `verba-multilingual-master` and connect it to Codex. This connector cannot create a repository through its exposed actions, so the user must create it manually or through Work with approved browser access. Do not repurpose an unrelated private repo.
4. Import the migration package's **`01_GIT_READY_PUBLIC_CODE/`** as a first source tree. Review any sensitive state before importing **`02_PRIVATE_MASTER/`** into private Git; alternatively keep its `LEARNING/` files in encrypted local storage and only commit code.
5. Keep 2.87GB of reference material out of standard Git and out of public PRs. GitHub rejects blobs exceeding 100MiB, and raw uploaded PDFs/books are not automatically licensed for redistribution or AI training.

## Existing branch chronology
- Production main = v1.0.33 Tiny/Base offline Portuguese (previously user-observed physical iPhone tests), leave unchanged.
- [PR #2](https://github.com/abasisadiqi-ops/portuguese-phone-asr/pull/2) draft = experimental hands-free voice app v1.0.43 (not phone-tested as integrated new feature).
- [PR #3](https://github.com/abasisadiqi-ops/portuguese-phone-asr/pull/3) draft = Greek historical evidence and dated pronunciation hypotheses (real GitHub browser previews passed).
- [PR #4](https://github.com/abasisadiqi-ops/portuguese-phone-asr/pull/4) draft = modern ASR/TTS quality gate logic (synthetic tests passed; no model weights trained).
- [PR #5](https://github.com/abasisadiqi-ops/portuguese-phone-asr/pull/5) draft = replacement v1.0.45 conversation-first UI prototype (not integrated with Qwen/Whisper). GitHub previews only, user design approval pending.

## Tests and stop conditions
- Preserve 66-hour wake-relative programme and original tutor state; conditional 72-hour stretch and 1/3/7/14/30 spaced-review unchanged. No automatic progress credit.
- Greek/Hebrew/Geʽez reconstructed ancient readings MUST carry dated witnesses and uncertainty; no generative modern TTS sound is an authenticated ancient recording.
- Model improvements require rights/consent, human-corrected speaker-separated benchmarks, distinct PT-PT vs PT-BR and Greek modern/historical separation, device runtime RAM/quota evidence, privacy and energy tests.
- iPhone Home Screen web app can work offline in foreground, but continuous off-app background microphone/inference isn't guaranteed. Native background audio is its own code-signing/device track.
- Keep app mutation opt-in and releases under explicit user approval. Preview only from actual built code in GitHub Actions, never generated imagery.
- Avoid dangerous monorepo migration with overwriting PR branches. Preserve original deployed commit and source for rollback.

## Migration artifact layout (user-owned private ZIP)
`START_HERE.md` · `HANDOFF_CODEX.md` · `HANDOFF_WORK.md` · `GITHUB_ACCESS_AND_PRIVACY.md` · `01_GIT_READY_PUBLIC_CODE` · `02_PRIVATE_MASTER` · `03_VERSIONED_CHECKPOINTS` · `04_PRIVATE_REFERENCE_REGISTRY` · `TOOLS/verify_migration.py`.

Five Malagasy Project attachments are recorded as unavailable raw files and must be reattached if their full bytes are required.

**This document adds no new production app behavior and does not authorize publishing or private source disclosure.**
