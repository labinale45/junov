import { NextResponse } from "next/server";

type ExplainMode = "overall" | "line-by-line";

interface ExplainRequestBody {
  code?: unknown;
  language?: unknown;
  mode?: unknown;
  improve?: unknown;
}

const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_CODE_LENGTH = 20000;

// Module-level in-memory store. Persists across requests within the same
// server process — intentional, no database needed for this rate limit.
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const fromForwarded = forwardedFor?.split(",")[0]?.trim();
  if (fromForwarded) return fromForwarded;
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now >= entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT) {
    return false;
  }

  entry.count += 1;
  return true;
}

function buildPrompt(code: string, language: string, mode: ExplainMode, improve: boolean): string {
  const improveLine = improve ? 'Add a "Suggested Improvements" section at the end.' : "";

  if (mode === "line-by-line") {
    return `Explain this ${language} code line by line.\nFor each line or logical block, explain simply what it does.\nFormat as markdown with the code and explanation paired.\n${improveLine}\nCode:\n\`\`\`${language}\n${code}\n\`\`\``;
  }

  return `Explain this ${language} code in plain English.\nCover: what it does, how it works, key concepts used.\nFormat in markdown with clear headings.\n${improveLine}\nCode:\n\`\`\`${language}\n${code}\n\`\`\``;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI explanations aren't configured yet. Please try again later." },
        { status: 500 }
      );
    }

    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "You've reached today's limit of 10 explanations. Please try again tomorrow." },
        { status: 429 }
      );
    }

    let body: ExplainRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request. Please try again." }, { status: 400 });
    }

    const code = typeof body.code === "string" ? body.code : "";
    const language = typeof body.language === "string" && body.language.trim() ? body.language : "plaintext";
    const mode: ExplainMode = body.mode === "line-by-line" ? "line-by-line" : "overall";
    const improve = body.improve === true;

    if (!code.trim()) {
      return NextResponse.json({ error: "Please paste some code to explain." }, { status: 400 });
    }

    if (code.length > MAX_CODE_LENGTH) {
      return NextResponse.json(
        { error: "That code snippet is too long — please paste under 20,000 characters." },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(code, language, mode, improve);

    let res: Response;
    try {
      res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );
    } catch (err) {
      console.error("Gemini API request failed:", err);
      return NextResponse.json(
        { error: "Something went wrong generating the explanation. Please try again." },
        { status: 502 }
      );
    }

    if (!res.ok) {
      const errorBody = await res.text().catch(() => "");
      console.error(`Gemini API returned status ${res.status}: ${errorBody}`);
      if (res.status === 429) {
        return NextResponse.json(
          { error: "The AI service is busy right now. Please try again in a minute." },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: "Something went wrong generating the explanation. Please try again." },
        { status: 502 }
      );
    }

    let data: unknown;
    try {
      data = await res.json();
    } catch (err) {
      console.error("Failed to parse Gemini API response:", err);
      return NextResponse.json(
        { error: "Something went wrong generating the explanation. Please try again." },
        { status: 502 }
      );
    }

    const text = (
      data as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      }
    )?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text || !text.trim()) {
      console.error("Gemini API response missing explanation text.");
      return NextResponse.json(
        { error: "Something went wrong generating the explanation. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ result: text });
  } catch (err) {
    console.error("Unexpected error in /api/explain-code:", err);
    return NextResponse.json(
      { error: "Something went wrong generating the explanation. Please try again." },
      { status: 500 }
    );
  }
}
