const BACKEND_BASE =
  import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:3000";

async function request(path, options = {}) {
  const response = await fetch(`${BACKEND_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof body === "string"
        ? body
        : body?.error || body?.message || "Request failed";
    throw new Error(message);
  }

  return body;
}

export const api = {
  getLoginUrl(params = {}) {
    const { prompt = "", length = 10, mood = "Balanced" } = params;
    const urlParams = new URLSearchParams({ prompt, length, mood });
    return `${BACKEND_BASE}/login?${urlParams.toString()}`;
  },

  async generatePreview({ prompt, length, mood }) {
    return request("/generate-playlist/preview", {
      method: "POST",
      body: JSON.stringify({ prompt, length, mood }),
    });
  },

  async createPlaylist({ prompt, length, songs }) {
    return request("/generate-playlist", {
      method: "POST",
      body: JSON.stringify({ prompt, length, songs }),
    });
  },
  
  async checkAuthStatus() {
    return request("/status");
  },
};

