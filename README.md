# Alternate Timeline Songsmith

A lightweight web app for building strict song-generation prompts for "alternate-universe" original songs.

## What it does

- Captures session context (artist, era, scene, genre, concept).
- Builds a reusable **master prompt** with structural and formatting constraints.
- Generates a **three-section response scaffold** (Sonic DNA, Lyrics, Description/One-liner).
- Scans generated text against a **banned language list**.

## Run locally

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.
