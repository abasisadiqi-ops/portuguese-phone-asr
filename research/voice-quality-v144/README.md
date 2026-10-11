# v1.0.44 — Independent spoken-model quality gates

**Review-only research lane.** No model weights, browser ASR upgrade, voice cloning, user recordings, or private data is added to this public repository. No live Pages deployment is possible from the research workflow. Do not infer historical pronunciation from modern synthesis.

## Why this lane exists

The existing Whisper Tiny/Base models demonstrably performed offline Portuguese recognition on a physical iPhone, but just two same-audio comparisons yielded only a one-word advantage for Base across 22 reference words. That does not justify model promotion. The existing continuous Conversation prototype uses experimental browser generation and energy-based VAD; local unit tests cannot prove a fluent low-latency speech partner. Bigger parameters or a language listed on a model card do not guarantee native-speaker quality or Safari compatibility.

### Actual candidates to investigate

| Task | Candidate | Why | Explicit missing proof |
|---|---|---|---|
| ASR baseline | Whisper Tiny/Base ONNX | User reported offline iPhone inference | Native speaker benchmark across 30+ paired clips, multiple speakers, sessions |
| Strong multilingual ASR | onnx-community/whisper-large-v3-turbo | Transformer.js/ONNX export | iPhone Safari runtime, cache size, actual PT-PT/Modern Greek errors, power |
| Modern multilingual ASR | Qwen/Qwen3-ASR-0.6B-hf and 1.7B-hf | Official model family lists Portuguese, Modern Greek and Arabic | These HF checkpoints are PyTorch Transformers; **not verified as working browser ONNX/WebGPU packages** |
| Learned VAD | Silero VAD / sherpa-onnx candidate | May improve noise robustness versus raw RMS energy | Actual Safari WASM integration, end-of-turn false positives and echo |
| PT-PT TTS | Piper pt_PT-tugão, Kyutai Pocket TTS Portuguese | Concrete local synthesis candidates | Model-card rights, independent PT-PT listeners, iPhone runtime/latency |
| Modern Greek TTS | Piper el_GR-joy / el_GR-rapunzelina | ONNX voices listed in official catalogue | Native Greek prosody, permission, rendering; **never Ancient Greek** |
| Expressive multilingual TTS | Qwen3-TTS-0.6B | Published Portuguese model family | pt-PT quality/voice consent/offline phone port; **official language list does not include Greek** |
| Natural conversation | local Qwen2.5-0.5B adapter | Unrestricted subject and user-mutable voice controls | Multi-turn naturalness, logical coherence, dialect and memory, phone speed |

Sources: [Qwen3-ASR](https://github.com/QwenLM/Qwen3-ASR), [HF Qwen3-ASR docs](https://huggingface.co/docs/transformers/model_doc/qwen3_asr), [Whisper Turbo ONNX](https://huggingface.co/onnx-community/whisper-large-v3-turbo), [Kyutai Pocket TTS](https://kyutai.org/blog/2026-05-04-pocket-tts-multilingual/), [Piper voice inventory](https://huggingface.co/rhasspy/piper-voices/blob/main/voices.json), [Qwen3-TTS](https://github.com/QwenLM/Qwen3-TTS).

Each Piper voice has its own MODEL_CARD. Do not infer usage rights for a specific voice merely from the general repository license. Speaker recordings, voice identities and dialect labels require explicit ethical review.

## Gate specification

- **Held-out ASR corpus**: speaker-separated AND session-separated clips, human-corrected text, explicitly verified data rights; each candidate/baseline must process identical SHA-labeled audio.
- **Exploratory minimum**: 30 clips / 5 speakers / 5 sessions / 2 acoustic conditions. This is only the earliest screening threshold, **not evidence of production readiness**. Production needs considerably larger external independent tests and uncertainty ranges, with separate dialect/locale results.
- **Metrics**: grapheme/character error rate preserving meaningful script marks (Arabic vowels, Hebrew niqqud, Greek accents); WER only after tokenizer convention is agreed; separate performance against names, code-switching, spontaneous speech, and noisy environments. Report **load time versus decode time**.
- **Hands-free loop**: real end-of-speech-to-first-voice latency, VAD false turn rate, clipped consonants, retries, hallucinations, echo with loudspeaker versus headphones, barge-in, Mute physical release. App should continue in foreground without per-turn push-to-talk.
- **TTS**: 30 diverse utterances / 3 relevant native raters are an initial gate. Score intelligibility, locale authenticity, pronunciation, prosody, emotional appropriateness and dialect, and register/lexical stress errors; larger trials required. Voice cloning never occurs without speaker rights.
- **Historical Greek, Hebrew and Geʽez**: document-specific pronunciation reconstruction is a different scholarly lane. Modern models cannot authenticate ancient sound; voice demonstrations must be explicitly labeled as pedagogical or speculative and opt-in.
- **Upgrade decision**: independent human reviewer sign-off, model license audit, iPhone offline cold restart and same-device battery/memory/thermal tests. New models should not replace Tiny or Base until reproducibly better.

## Code and tests

`quality_gate.mjs` describes models and calculates a **screening/hold decision** for explicitly reviewed sample summaries. `quality_gate.test.mjs` contains nine synthetic tests for paired baselines, speaker/recording diversity, rights, TTS raters and prevention of automatic promotion. Run `node --test research/voice-quality-v144/quality_gate.test.mjs`. No raw sound, transcript or identifiable user metadata is inside the repository.

This branch can merge independently from draft PR #2 (the much larger phone Conversation PWA) and PR #3 (historical Greek), while preserving the working public v1.0.33 site.
