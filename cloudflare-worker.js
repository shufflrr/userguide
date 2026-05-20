/**
 * Cloudflare Worker — OpenAI proxy for the Shufflrr Ask AI chatbot.
 * The API key is stored as a Secret named OPENAI_API_KEY in worker Settings.
 *
 * Optional environment variables:
 * - ALLOWED_ORIGINS: comma-separated origins allowed to call this Worker.
 * - OPENAI_MODEL: model override; defaults to gpt-5.4-mini.
 * - CHAT_RATE_LIMITER: optional Cloudflare Rate Limiting binding.
 */

const DEFAULT_ALLOWED_ORIGINS = [
  "https://howto.shufflrr.com",

  // Temporary local testing only. Do not leave these enabled in production.
  // "http://localhost:3000",
  // "http://127.0.0.1:3000",
];

const MAX_BODY_BYTES = 256 * 1024;
const MAX_MESSAGES = 16;
const MAX_MESSAGE_CHARS = 120000;
const MAX_TOTAL_CHARS = 160000;
const MODEL = "gpt-5.4-mini";

function getClientIp(request) {
  return request.headers.get("CF-Connecting-IP") ||
    request.headers.get("X-Forwarded-For") ||
    "unknown";
}

async function enforceRateLimit(request, env, corsHeaders) {
  if (!env.CHAT_RATE_LIMITER) return null;

  const ip = getClientIp(request);
  const origin = request.headers.get("Origin") || "no-origin";
  const key = `${origin}:${ip}`;
  const { success } = await env.CHAT_RATE_LIMITER.limit({ key });

  if (success) return null;

  return jsonResponse(
    { error: "Too many requests. Please wait a minute and try again." },
    429,
    { ...corsHeaders, "Retry-After": "60" },
  );
}

function parseAllowedOrigins(env) {
  const configured = String(env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  return configured.length ? configured : DEFAULT_ALLOWED_ORIGINS;
}

function getCorsHeaders(request, env) {
  const origin = request.headers.get("Origin");
  const allowedOrigins = parseAllowedOrigins(env);
  const isAllowedOrigin = !!origin && allowedOrigins.includes(origin);
  const allowOrigin = isAllowedOrigin ? origin : allowedOrigins[0];

  return {
    headers: {
      "Access-Control-Allow-Origin": allowOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      "Vary": "Origin",
    },
    isAllowedOrigin,
  };
}

function jsonResponse(payload, status, corsHeaders) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
    },
  });
}

function validateMessages(input) {
  if (!input || !Array.isArray(input.messages)) {
    throw new Error("Request must include a messages array.");
  }

  if (input.messages.length < 1 || input.messages.length > MAX_MESSAGES) {
    throw new Error(`Request must include 1-${MAX_MESSAGES} messages.`);
  }

  let totalChars = 0;
  const messages = input.messages.map((message) => {
    if (!message || typeof message !== "object") {
      throw new Error("Each message must be an object.");
    }

    const role = message.role;
    const content = typeof message.content === "string" ? message.content.trim() : "";

    if (!["system", "user", "assistant"].includes(role)) {
      throw new Error("Message role is not allowed.");
    }

    if (!content || content.length > MAX_MESSAGE_CHARS) {
      throw new Error(`Each message must be 1-${MAX_MESSAGE_CHARS} characters.`);
    }

    totalChars += content.length;
    if (totalChars > MAX_TOTAL_CHARS) {
      throw new Error(`Messages exceed the ${MAX_TOTAL_CHARS} character limit.`);
    }

    return { role, content };
  });

  if (messages.filter((message) => message.role === "system").length > 1) {
    throw new Error("Only one system message is allowed.");
  }

  return messages;
}

export default {
  async fetch(request, env) {
    const cors = getCorsHeaders(request, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors.headers });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405, cors.headers);
    }

    if (!cors.isAllowedOrigin) {
      return jsonResponse({ error: "Origin not allowed" }, 403, cors.headers);
    }

    if (!env.OPENAI_API_KEY) {
      return jsonResponse({ error: "OpenAI proxy is not configured" }, 500, cors.headers);
    }

    const rateLimitResponse = await enforceRateLimit(request, env, cors.headers);
    if (rateLimitResponse) return rateLimitResponse;

    const contentType = request.headers.get("Content-Type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return jsonResponse({ error: "Content-Type must be application/json" }, 415, cors.headers);
    }

    const contentLength = Number(request.headers.get("Content-Length") || "0");
    if (contentLength && contentLength > MAX_BODY_BYTES) {
      return jsonResponse({ error: "Request is too large" }, 413, cors.headers);
    }

    let body;
    try {
      const rawBody = await request.text();
      if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
        return jsonResponse({ error: "Request is too large" }, 413, cors.headers);
      }
      body = JSON.parse(rawBody);
    } catch {
      return jsonResponse({ error: "Invalid JSON" }, 400, cors.headers);
    }

    let messages;
    try {
      messages = validateMessages(body);
    } catch (error) {
      return jsonResponse({ error: error.message }, 400, cors.headers);
    }

    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: env.OPENAI_MODEL || MODEL,
        stream: true,
        max_completion_tokens: 1000,
        messages,
      }),
    });

    if (!upstream.ok) {
      let upstreamError = "OpenAI request failed";
      try {
        const upstreamBody = await upstream.json();
        upstreamError = upstreamBody && upstreamBody.error && upstreamBody.error.message
          ? upstreamBody.error.message
          : upstreamError;
      } catch (_) {}

      return jsonResponse({ error: upstreamError }, upstream.status, cors.headers);
    }

    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        ...cors.headers,
        "Content-Type": upstream.headers.get("Content-Type") || "text/event-stream",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "no-referrer",
      },
    });
  },
};
