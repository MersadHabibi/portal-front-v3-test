export async function shortenUrl(
  longUrl: string
): Promise<{ shortUrl: string | null }> {
  try {
    // Call TinyURL API
    const res = await fetch(
      `/api/shorten-url?url=${longUrl}`
    );
    const {shortUrl} = await res.json();

    return { shortUrl };
  } catch {
    return { shortUrl: null };
  }
}
