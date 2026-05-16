import Link from "next/link";
import SearchClient from "./SearchClient";

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

async function getPopularMovies(): Promise<Movie[]> {
  const queries = ["marvel", "batman", "harry potter"];

  const responses = await Promise.all(
    queries.map(async (query) => {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${encodeURIComponent(query)}`,
        { cache: "no-store" }
      );
      return res.json();
    })
  );

  return responses.flatMap((item) => item.Search || []).slice(0, 10);
}

export default async function MoviesPage() {
  const movies = await getPopularMovies();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_50%,#ffffff_100%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
          >
            ← Volver
          </Link>

          <div className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            OMDb + Next.js
          </div>
        </div>

        <section className="mb-10 rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Galería de Películas y Series
          </h1>
          <p className="mt-4 max-w-3xl text-slate-600 leading-7">
            La parte superior carga películas populares con SSR desde el servidor.
            La parte inferior usa CSR para buscar en tiempo real sin recargar.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              SSR arriba
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
              CSR abajo
            </span>
            <span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
              Detalle en modal
            </span>
          </div>
        </section>

        <section className="mb-14">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
                SSR
              </p>
              <h2 className="mt-2 text-3xl font-black">Películas populares</h2>
              <p className="mt-2 text-slate-600">
                Esta sección se renderiza en el servidor.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right shadow-sm">
              <p className="text-sm text-slate-500">Renderizado</p>
              <p className="font-bold text-slate-900">Server Side Rendering</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
            {movies.map((movie) => (
              <article
                key={movie.imdbID}
                className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.06)]"
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x445?text=Sin+imagen"
                  }
                  alt={movie.Title}
                  className="h-[320px] w-full object-cover"
                />
                <div className="p-4">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                    {movie.Type}
                  </span>
                  <h3 className="mt-3 line-clamp-2 text-base font-bold text-slate-900">
                    {movie.Title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{movie.Year}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <SearchClient />
      </div>
    </main>
  );
}