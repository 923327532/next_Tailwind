export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("s") || "";

  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${encodeURIComponent(search)}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  return Response.json(data);
}