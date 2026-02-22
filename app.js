const bannedTerms = [
  "heart of stone",
  "heavy heart",
  "broken heart",
  "voice trembling",
  "tears falling",
  "lungs can't breathe",
  "rage",
  "flame",
  "glow",
  "scars",
  "pain",
  "silence",
  "shadows",
  "cage",
  "chains",
  "breaking free",
  "neon lights",
  "pouring rain",
  "city streets at night",
  "shattered glass",
  "ticking clocks",
  "pavement",
  "i can't go on",
  "you tore me apart",
  "we were meant to be",
  "this town is killing me",
  "glitch in the system",
  "static in my brain",
  "ghost in the machine",
  "algorithm",
  "signal",
  "bittersweet",
  "hum",
  "coffee",
  "comfort zone",
  "holding on",
  "smile fades",
  "hoodie",
  "combat boots",
  "truth",
  "becoming",
  "eternity",
  "divine",
  "linger",
  "fade",
  "wander",
  "bratty"
];

const ids = {
  artist: document.getElementById("artist"),
  albumEra: document.getElementById("albumEra"),
  year: document.getElementById("year"),
  city: document.getElementById("city"),
  genre: document.getElementById("genre"),
  concept: document.getElementById("concept"),
  intensity: document.getElementById("intensity"),
  hookStyle: document.getElementById("hookStyle"),
  workflowMode: document.getElementById("workflowMode"),
  draftInput: document.getElementById("draftInput"),
  scanResults: document.getElementById("scanResults"),
  promptOutput: document.getElementById("promptOutput"),
  scaffoldOutput: document.getElementById("scaffoldOutput")
};

function createMasterPrompt() {
  const settings = {
    artist: ids.artist.value.trim() || "[artist]",
    albumEra: ids.albumEra.value.trim() || "[album/era]",
    year: ids.year.value.trim() || "[year]",
    city: ids.city.value.trim() || "[city]",
    genre: ids.genre.value.trim() || "[genre]",
    concept: ids.concept.value.trim() || "[song concept]",
    intensity: ids.intensity.value,
    hookStyle: ids.hookStyle.value,
    workflowMode: ids.workflowMode.value
  };

  return `You are writing an alternate-universe original track.

Target voice profile:
- Artist voice: ${settings.artist}
- Album/Era anchor: ${settings.albumEra}
- Year/Scene: ${settings.year}, ${settings.city}
- Genre frame: ${settings.genre}
- Concept seed: ${settings.concept}
- Lyrical intensity: ${settings.intensity}
- Hook strategy: ${settings.hookStyle}

Hard requirements:
1) Output sections in exact order:
   - 🎛 SONIC DNA (8 fixed lines)
   - 🧠 SONG TITLE + LYRICS (full song, all-caps section headers)
   - 🎚 DESCRIPTION + ONE-LINER
2) Use parentheses only for backing vocals, gang vocals, ooh/whoa/ahh, spoken asides.
3) Use brackets only for stage directions.
4) Never use shorthand repeats like x2.
5) No modern slang unless era-appropriate.
6) Never mention real songs, bands, album titles, or member names.
7) Avoid banned language list and cliché imagery.

Workflow mode: ${settings.workflowMode === "guided" ? "First provide SONIC DNA and ask if user wants lyrics next." : "Provide all sections in one complete response."}`;
}

function createScaffold() {
  return `🎛 SONIC DNA – ${ids.year.value || "YEAR"} / ${ids.city.value || "CITY"} / ${ids.genre.value || "GENRE"}
Guitars:
Bass:
Drums:
Vocals:
Hooks:
Structure:
Mix:
Lyrics:

🧠 SONG TITLE + LYRICS
[VERSE 1]

[PRE-CHORUS]

[CHORUS]

[VERSE 2]

[CHORUS]

[BRIDGE]

[FINAL CHORUS]

🎚 DESCRIPTION + ONE-LINER
Description:

One-liner:`;
}

function scanDraft() {
  const text = ids.draftInput.value.toLowerCase();
  if (!text.trim()) {
    ids.scanResults.textContent = "Paste lyrics/description first.";
    ids.scanResults.className = "output";
    return;
  }

  const hits = bannedTerms.filter((term) => text.includes(term));

  if (!hits.length) {
    ids.scanResults.textContent = "No banned terms detected.";
    ids.scanResults.className = "output clean";
    return;
  }

  ids.scanResults.textContent = `Detected ${hits.length} banned term(s):\n- ${hits.join("\n- ")}`;
  ids.scanResults.className = "output hit";
}

function copyPrompt() {
  const text = ids.promptOutput.textContent;
  if (!text) {
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    ids.promptOutput.textContent += "\n\n[Copied to clipboard]";
  });
}

document.getElementById("buildPromptBtn").addEventListener("click", () => {
  ids.promptOutput.textContent = createMasterPrompt();
});

document.getElementById("buildScaffoldBtn").addEventListener("click", () => {
  ids.scaffoldOutput.textContent = createScaffold();
});

document.getElementById("scanBtn").addEventListener("click", scanDraft);
document.getElementById("clearBtn").addEventListener("click", () => {
  ids.draftInput.value = "";
  ids.scanResults.textContent = "";
  ids.scanResults.className = "output";
});
document.getElementById("copyBtn").addEventListener("click", copyPrompt);
