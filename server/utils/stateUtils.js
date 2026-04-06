/**
 * Spotify OAuth `state` is used to carry the user's prompt through the redirect.
 * Now expanded to carry track length and atmospheric mood too!
 */

export function createPromptState(prompt, length, mood) {
  const payload = { prompt, length: Number(length), mood };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export function decodeState(state, fallback) {
  if (typeof state !== "string" || state.length >= 5000) return fallback;

  try {
    const decoded = Buffer.from(state, "base64").toString("utf8");
    const parsed = JSON.parse(decoded);

    return {
      prompt: parsed.prompt || fallback.prompt,
      length: Number(parsed.length) || fallback.length,
      mood: parsed.mood || fallback.mood
    };
  } catch {
    return fallback;
  }
}

export function sanitizePrompt(prompt, fallbackPrompt, maxLen = 200) {
  const input = typeof prompt === "string" ? prompt.trim() : "";
  const safe = input || fallbackPrompt;
  return safe.slice(0, maxLen);
}

