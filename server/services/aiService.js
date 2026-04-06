import { InferenceClient } from "@huggingface/inference";
import { env } from "../config/env.js";

function extractJsonArray(text) {
  if (typeof text !== "string") return null;
  
  // 🧹 Robust Sanitization: LLMs sometimes include broken escape characters like \ or unescaped quotes.
  // We'll strip them out to avoid SyntaxErrors before parsing.
  const cleanedText = text
    .replace(/\\(?!["\\\/bfnrtu])/g, "") // Remove 'bad' backslashes that aren't valid JSON escapes
    .trim();

  const start = cleanedText.indexOf("[");
  const end = cleanedText.lastIndexOf("]");
  if (start === -1 || end === -1 || end <= start) return null;

  const candidate = cleanedText.slice(start, end + 1);
  
  try {
    return JSON.parse(candidate);
  } catch (err) {
    console.error("🛑 FAILED TO PARSE AI JSON:", err.message);
    console.warn("MALFORMED JSON STRING:", candidate);
    return null; // We return null so the 'fallback' logic in generateSongs can take over
  }
}

function normalizeSongs(rawText) {
  const out = [];
  // Split by newlines, but also handle cases where AI might use other delimiters
  const lines = rawText.split(/\n/);

  for (const line of lines) {
    let s = line.trim();
    if (!s) continue;

    // 🧹 Clean up common AI prefixes: "1. ", "- ", "   ", etc.
    // This regex looks for numbering or bullets at the start and removes them
    s = s.replace(/^[0-9]+[.)]\s*/, "").replace(/^[-*•]\s*/, "").trim();
    if (!s) continue;

    // Normalize dash variants to " - "
    s = s.replaceAll("\u2013", "-").replaceAll("\u2014", "-");

    // Extract "Artist - Song". We'll also try to handle "Artist: Song" just in case.
    const match = s.match(/^(.+?)\s*[-:]\s*(.+)$/);
    if (!match) continue;

    const artist = match[1].trim();
    const title = match[2].trim();
    if (!artist || !title) continue;

    out.push(`${artist} - ${title}`);
  }

  return out;
}

/**
 * Hugging Face Inference API call using Mistral AI.
 * Now dynamically requests a list based on user length and mood!
 */
export async function generateSongsFromPrompt(prompt, count = 10, mood = "neutral") {
  if (typeof prompt !== "string" || !prompt.trim()) {
    throw new Error("Prompt must be a non-empty string");
  }

  if (!env.HF_API_KEY) {
    throw new Error("HF_API_KEY is not set. Please check your .env file.");
  }

  const client = new InferenceClient(env.HF_API_KEY);
  
  // We ask for a healthy buffer to ensure we hit the user's requested count
  const bufferCount = Math.max(5, Math.ceil(count * 0.3)); 
  const requestedCount = Number(count) + bufferCount;

  async function fetchSongs(userMessage, expectedCount) {
    let result;
    try {
      result = await client.chatCompletion({
        model: env.HF_MODEL,
        provider: "featherless-ai",
        messages: [
          {
            role: "system",
            content:
              `You are a professional music curator. Vibe/Mood: ${mood}. ` +
              `Provide a list of EXACTLY ${expectedCount} unique songs. ` +
              'Format EACH line as: Artist - Song. ' +
              "DO NOT include any JSON, numbering, quotes, or introduction. Just the list.",
          },
          { role: "user", content: userMessage },
        ],
        max_tokens: 2048,
        temperature: 0.7,
      });
    } catch (err) {
      throw new Error(err?.message || "Hugging Face request failed");
    }

    const rawText = result?.choices?.[0]?.message?.content || "";
    return normalizeSongs(rawText);
  }

  console.log(`🤖 Requesting ${requestedCount} songs from Mistral for mood: ${mood}`);
  const songs = await fetchSongs(prompt.trim(), requestedCount);
  
  // Dedup and slice down to exactly what the user wanted
  const uniqueSongs = [...new Set(songs)];
  console.log(`✅ AI delivered ${uniqueSongs.length} songs.`);
  
  return uniqueSongs.slice(0, count);
}

