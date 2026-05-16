import Link from "next/link";

const sections = [
  {
    title: "Pokemon CSR",
    subtitle: "Interactividad inmediata desde el cliente",
    href: "/pokemon-csr",
    tag: "CSR",
  },
  {
    title: "Pokemon SSR",
    subtitle: "Carga inicial renderizada desde servidor",
    href: "/pokemon-ssr",
    tag: "SSR",
  },
  {
    title: "Weather Dashboard",
    subtitle: "Clima dinámico con interfaz moderna",
    href: "/weather",
    tag: "API",
  },
  {
    title: "Galería de Películas",
    subtitle: "Buscador visual con OMDb y detalle elegante",
    href: "/movies",
    tag: "LAB",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_45%,#ffffff_100%)] text-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14">
        <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-700 shadow-sm">
              Laboratorio 9
            </span>

            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Dashboard elegante
              <span className="block text-blue-700">de proyectos web</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Accede a tus prácticas de SSR, CSR, clima y películas desde una
              portada limpia, moderna y con estilo profesional.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:min-w-[320px]">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <p className="text-sm text-slate-500">Tecnología</p>
              <p className="mt-2 text-lg font-bold">Next.js</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <p className="text-sm text-slate-500">Estilo</p>
              <p className="mt-2 text-lg font-bold text-blue-700">Premium UI</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <p className="text-sm text-slate-500">Render</p>
              <p className="mt-2 text-lg font-bold">SSR + CSR</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
              <p className="text-sm text-slate-500">Módulos</p>
              <p className="mt-2 text-lg font-bold">4 pantallas</p>
            </div>
          </div>
        </header>

        <section className="mb-10 rounded-[28px] border border-blue-100 bg-white p-8 shadow-[0_20px_60px_rgba(37,99,235,0.08)] md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.4fr_0.8fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
                Panel principal
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
                Elige una pantalla y entra directo a tu laboratorio
              </h2>

              <p className="mt-4 max-w-2xl text-slate-600 leading-7">
                Una portada sobria y moderna, con tarjetas claras, contraste limpio
                y una estética más profesional basada en blanco, azul y negro.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                  UI limpia
                </span>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                  Tarjetas elegantes
                </span>
                <span className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                  Estilo profesional
                </span>
              </div>
            </div>

            <div className="rounded-[24px] bg-slate-950 p-6 text-white shadow-[0_20px_40px_rgba(15,23,42,0.18)]">
              <p className="text-sm uppercase tracking-[0.25em] text-blue-300">
                Resumen
              </p>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-slate-300">Frontend</span>
                  <span className="font-semibold">React + Tailwind</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-slate-300">Navegación</span>
                  <span className="font-semibold">Next Link</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Experiencia</span>
                  <span className="font-semibold text-blue-300">Avanzada</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)]"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                  {section.tag}
                </span>
                <span className="text-blue-700 transition group-hover:translate-x-1">
                  →
                </span>
              </div>

              <h3 className="mt-8 text-2xl font-bold tracking-tight text-slate-900">
                {section.title}
              </h3>

              <p className="mt-3 min-h-[52px] text-sm leading-6 text-slate-600">
                {section.subtitle}
              </p>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">
                  Abrir módulo
                </span>
                <span className="rounded-full bg-blue-700 px-4 py-2 text-sm font-semibold text-white">
                  Entrar
                </span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}