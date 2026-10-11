# v1.0.43 — session reliability and private aggregate timings

**GitHub-tested experimental module, not a published app update.**

The working source in this directory is the identical `createSessionMetrics` module integrated into the isolated v1.0.43 candidate app. It records only rounded elapsed times in `off`, `listening`, `capturing`, `processing` and `muted`, plus completed/failed turn counts. Data remains in memory. No audio, transcript, names, location, timestamp, network state verification, or learning credit is produced. A diagnostic is not proof that microphone hardware has been released or that VAD can distinguish actual speech.

[GitHub Actions run #38081597938](https://github.com/abasisadiqi-ops/portuguese-phone-asr/actions/runs/38081597938) successfully ran the four `session_metrics.test.mjs` tests and uploaded the plain-text `verba-v143-session-safety-reports` artifact, expiring on 24 October 2026.

## Race defects identified and fixed in the separate full-app candidate

1. **Microphone permission race:** old `getUserMedia()` permission success/rejection after Mute → Unmute used to clear a new stream. Fix: each start owns a unique epoch ticket, Mute/End invalidate it, and stale completions may stop only their **own** acquired stream.
2. **Dialogue completion race:** a previously interrupted Qwen request could clear the pending flag for a new turn. Fix: only the current epoch may settle the busy flag. Conversation UI cleanup uses matching request/session identity.
3. **Clock hygiene:** reject non-finite VAD settings and backward timestamps instead of silently accumulating impossible durations.

The complete application with these fixes passed **163/163 local Node tests** and **six Chromium browser workflows** using actual browser audio with mocked neural responses. The complete v1.0.43 ZIP is **not yet in GitHub**, so a full Vite compile and real iPhone device test remain pending. Its source SHA-256 is `929b9bc94ec7cf1f0df6399a34bce6f2509084d5059b2ac0009bef11b51d1c1a`. See the parent draft PR #2 and `SESSION_RECOVERY_AND_PRIVACY_v143.md` inside that ZIP.

No design images are produced here. Future preview screenshots will be captured by Chromium from the *compiled application in GitHub Actions*, if the full source ZIP is uploaded and CI succeeds.

No merge or Pages publication has occurred. The verified production website remains the earlier v1.0.33 Tiny/Base version.
