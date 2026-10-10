# v1.0.42 — adaptive microphone turn detection (experimental)

**Status: code and standalone GitHub tests committed; full app not deployed.** The live iPhone website remains on the previously validated v1.0.33 release.

The user wants natural, in-app, open-ended speaking with one Start, automatic turn boundaries, **physical microphone Mute** and no mandatory push-to-talk. The working v1.0.41 half-duplex session engine already handles start, silence, reply, resume and interrupt; v1.0.42 adds an **optional** adaptive noise baseline and microphone-track gating during model processing.

## Verified
- GitHub-native source: [adaptive_vad.mjs](./adaptive_vad.mjs) and [seven synthetic regression tests](./adaptive_vad.test.mjs).
- GitHub Actions automatically ran the standalone tests and passed: [run #38080732219](https://github.com/abasisadiqi-ops/portuguese-phone-asr/actions/runs/38080732219). It cannot deploy the site.
- Local full candidate (isolated ZIP not uploaded yet): **155/155** Node tests; **6/6** Chromium browser workflows, including browser-encoded microphone capture with injected sound levels, fake Whisper and local dialogue model.
- The unmodified original 66-hour wake-relative tutor and private Hebrew/Geʽez sources remain outside this repository.

## Safety and limitations
- This is an **energy detector**, not a speech classifier. Music, fans, traffic, animal calls and other speakers may still trigger it. Adaptive mode is explicitly opt-in, and default remains the earlier fixed-threshold mode.
- Noise floor adapts **only under the active threshold**, so speech should not get blindly learned as room noise.
- During processing and playback, tracks are disabled after the recorder has produced its last encoded chunk. **Track disabling is not physical microphone release**; it may retain OS microphone indicators. **Mute and End use track.stop()** and revoke the exclusive microphone lease.
- No off-app recording or unlimited WebGPU inference is claimed. iOS must be tested explicitly; half-duplex response handling means speaking over the assistant is not yet supported.
- No audio or transcripts are retained by the detector. Generative model quality, VAD error rate, Qwen/Whisper concurrency and offline cold-start in Safari are not measured by these synthetic tests.

## Full-app GitHub preview/build gate
The draft PR workflow requires exact `phone-asr-source-v142.zip` at the branch root, SHA-256:
`9b0b6d8734e0f246f6b0ab613f34cc2e8e0c5e19fefc853f5362f023b1663be5`.

Only the isolated public-safe **89-file** ZIP belongs here; never upload the private Multilingual Master archive or voice recordings. After upload, manually select this feature branch and run **Build or publish Portuguese ASR PWA**, with `deploy_pages=false`. The feature-branch publish guard prohibits Pages publication even if enabled inadvertently. GitHub will run production Vite compilation and must produce **eight actual Chromium screenshots of the built app** as `verba-v142-browser-previews`, along with the bundled output. At present that full build and those screenshots have **not occurred**.

## Future validation
Run five-minute quiet/noisy-room samples; track false activation, missed initial syllables, echo with device speaker versus headphones, mic indicator on Mute, 10 Mute/Unmute cycles, model latency, battery, memory, offline restart, and explicit cancellation while changing screens. Keep transcripts reviewable for rare/low-resource languages and no automatic study credit.
