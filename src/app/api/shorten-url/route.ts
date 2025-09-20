import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response(JSON.stringify({ error: "Missing URL" }), {
      status: 400,
    });
  }

  try {
    // Call TinyURL API (server-side, no CORS issue here)
    console.log("debug");
    const res = await fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`
    );

    console.log("hello");
    const shortUrl = await res.text();

    return new Response(JSON.stringify({ shortUrl }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to shorten" }), {
      status: 500,
    });
  }
}
