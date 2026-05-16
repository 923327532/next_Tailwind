"use client";

import { useEffect, useState } from "react";

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

type MovieDetail = {
  Title: string;
  Year: string;
  Genre: string;
  Plot: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  Poster: string;
  Runtime: string;
  Language: string;
  Country?: string;
};

export default function SearchClient() {
  const [query, setQuery] = useState("suits");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query.trim()) {
        setMovies([]);
        setError("");
        return;
      }

      const fetchMovies = async () => {
        setLoading(true);
        setError("");

        try {
          const res = await fetch(`/api/search?s=${encodeURIComponent(query)}`);
          const data = await res.json();

          if (data.Response === "False") {
            setMovies([]);
            setError(data.Error || "No se encontraron resultados.");
            return;
          }

          setMovies(data.Search || []);
        } catch {
          setMovies([]);
          setError("Ocurrió un error al buscar.");
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectMovie = async (id: string) => {
    setLoadingDetail(true);
    try {
      const res = await fetch(`/api/movie?id=${id}`);
      const data = await res.json();
      setSelectedMovie(data);
    } finally {
      setLoadingDetail(false);
    }
  };

  const closeModal = () => setSelectedMovie(null);

  return (
    <section className="pb-16">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-900">
            CSR
          </p>
          <h2 className="mt-2 text-3xl font-black text-slate-900">
            Búsqueda en tiempo real
          </h2>
          <p className="mt-2 text-slate-600">
            Esta sección se actualiza sin recargar la página.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-right shadow-sm">
          <p className="text-sm text-slate-500">Renderizado</p>
          <p className="font-bold text-slate-900">Client Side Rendering</p>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Busca una película o serie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
          />
          <div className="flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-4 text-sm font-semibold text-white">
            Buscador CSR
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
            Ejemplo: Batman
          </span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
            Ejemplo: Suits
          </span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
            Ejemplo: Avengers
          </span>
        </div>
      </div>

      {loading && <p className="mt-5 text-slate-600">Buscando resultados...</p>}
      {error && <p className="mt-5 text-red-600">{error}</p>}
      {!loading && !error && movies.length > 0 && (
        <p className="mt-5 text-slate-500">Resultados encontrados: {movies.length}</p>
      )}

      <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
        {movies.map((movie) => (
          <article
            key={movie.imdbID}
            onClick={() => handleSelectMovie(movie.imdbID)}
            className="cursor-pointer overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_14px_30px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(37,99,235,0.12)]"
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
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                  {movie.Type}
                </span>
                <span className="text-xs font-semibold text-blue-700">Ver detalle</span>
              </div>

              <h3 className="mt-3 line-clamp-2 text-base font-bold text-slate-900">
                {movie.Title}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{movie.Year}</p>
            </div>
          </article>
        ))}
      </div>

      {loadingDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <p className="rounded-xl bg-white px-6 py-4 text-slate-900 shadow-xl">
            Cargando detalle...
          </p>
        </div>
      )}

      {selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[28px] bg-white shadow-2xl">
            <div className="grid md:grid-cols-[320px_1fr]">
              <img
                src={
                  selectedMovie.Poster !== "N/A"
                    ? selectedMovie.Poster
                    : "https://via.placeholder.com/300x445?text=Sin+imagen"
                }
                alt={selectedMovie.Title}
                className="h-full w-full object-cover"
              />

              <div className="p-6 md:p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
                      Detalle
                    </p>
                    <h3 className="mt-2 text-3xl font-black text-slate-900">
                      {selectedMovie.Title}
                    </h3>
                    <p className="mt-2 text-slate-500">
                      {selectedMovie.Year} • {selectedMovie.Runtime} • {selectedMovie.Language}
                    </p>
                  </div>

                  <button
                    onClick={closeModal}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    Cerrar
                  </button>
                </div>

                <div className="mb-6 flex flex-wrap gap-3">
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
                    IMDb {selectedMovie.imdbRating}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700">
                    {selectedMovie.Genre}
                  </span>
                  {selectedMovie.Country && (
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700">
                      {selectedMovie.Country}
                    </span>
                  )}
                </div>

                <p className="mb-6 leading-7 text-slate-600">{selectedMovie.Plot}</p>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Director</p>
                    <p className="mt-1 font-semibold text-slate-900">{selectedMovie.Director}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Actores</p>
                    <p className="mt-1 font-semibold text-slate-900">{selectedMovie.Actors}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}