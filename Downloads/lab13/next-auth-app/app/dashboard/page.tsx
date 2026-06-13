import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import Flag from 'react-world-flags';

// ====== DATA ======
const todayMatches = [
  {
    id: 1,
    time: '14:00',
    team1: { name: 'Catar', code: 'QA' },
    team2: { name: 'Suiza', code: 'CH' },
    group: 'B',
    stadium: 'Estadio de la Bahia de San Francisco',
    score1: 1,
    score2: 0,
    live: true,
  },
  {
    id: 2,
    time: '17:00',
    team1: { name: 'Brasil', code: 'BR' },
    team2: { name: 'Marruecos', code: 'MA' },
    group: 'C',
    stadium: 'Estadio Nueva York / Nueva Jersey',
    live: false,
  },
  {
    id: 3,
    time: '20:00',
    team1: { name: 'Haiti', code: 'HT' },
    team2: { name: 'Escocia', code: 'GB' },
    group: 'C',
    stadium: 'Estadio Boston',
    live: false,
  },
  {
    id: 4,
    time: '23:00',
    team1: { name: 'Australia', code: 'AU' },
    team2: { name: 'Turquia', code: 'TR' },
    group: 'D',
    stadium: 'Estadio BC Place Vancouver',
    live: false,
  },
];

function LiveDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
    </span>
  );
}

function TeamFlagWidget({ code, name, size = 48 }: { code: string; name: string; size?: number }) {
  return (
    <div
      className="relative rounded-full overflow-hidden border-2 border-white/30 shadow-md flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <Flag
        code={code}
        fallback={
          <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-[10px] font-bold">
            {name.substring(0, 2).toUpperCase()}
          </div>
        }
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/signIn');
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Bienvenido, <span className="text-indigo-600">{session?.user?.name || 'Usuario'}</span>
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm">
                        Panel de control &middot; {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ===== LEFT COLUMN: TODAY'S MATCHES ===== */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
                            {/* Section header */}
                            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center shadow-sm">
                                        <svg className="w-4 h-4 text-white" viewBox="0 0 64 64" fill="currentColor">
                                            <path d="M48 8h-4V4H20v4h-4v4h4v4c0 9.94 6.11 18.43 14.67 21.87C30.72 39.43 26 43.32 26 48v4h-6v4h24v-4h-6v-4c0-4.68-4.72-8.57-8.67-10.13C41.89 34.43 48 25.94 48 16v-4h4V8zM28 8h8v2h-8V8zm4 12c-3.31 0-6-2.69-6-6h12c0 3.31-2.69 6-6 6z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">Mundial 2026</h2>
                                        <p className="text-xs text-gray-400">Sabado 13 de Junio &middot; 4 partidos</p>
                                    </div>
                                </div>
                                <Link
                                    href="/mundial"
                                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-colors"
                                >
                                    Ver todos
                                </Link>
                            </div>

                            {/* Matches list */}
                            <div className="divide-y divide-gray-50">
                                {todayMatches.map((match) => (
                                    <div
                                        key={match.id}
                                        className="px-6 py-4 hover:bg-gray-50/80 transition-colors group"
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Time column */}
                                            <div className="w-16 flex-shrink-0 text-center">
                                                <span className="text-sm font-bold text-gray-800">{match.time}</span>
                                                {match.live && (
                                                    <div className="flex justify-center mt-1">
                                                        <LiveDot />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Teams */}
                                            <div className="flex-1 flex items-center justify-center gap-4 sm:gap-8">
                                                {/* Team 1 */}
                                                <div className="flex flex-col items-center gap-1.5 w-24">
                                                    <div className="transform transition-transform duration-300 group-hover:scale-110">
                                                        <TeamFlagWidget code={match.team1.code} name={match.team1.name} size={44} />
                                                    </div>
                                                    <span className="text-[11px] font-semibold text-gray-700 text-center truncate w-full">
                                                        {match.team1.name}
                                                    </span>
                                                </div>

                                                {/* Score / VS */}
                                                <div className="flex flex-col items-center gap-1">
                                                    {match.live ? (
                                                        <>
                                                            <span className="text-xl font-black text-gray-900 tabular-nums">
                                                                1 - 0
                                                            </span>
                                                            <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded-full">
                                                                En Vivo
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="text-sm font-bold text-gray-400">VS</span>
                                                            <span className="text-[10px] font-semibold text-emerald-500 uppercase tracking-wider">
                                                                Proximo
                                                            </span>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Team 2 */}
                                                <div className="flex flex-col items-center gap-1.5 w-24">
                                                    <div className="transform transition-transform duration-300 group-hover:scale-110">
                                                        <TeamFlagWidget code={match.team2.code} name={match.team2.name} size={44} />
                                                    </div>
                                                    <span className="text-[11px] font-semibold text-gray-700 text-center truncate w-full">
                                                        {match.team2.name}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Group badge */}
                                            <div className="w-12 flex-shrink-0 text-center">
                                                <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                                                    {match.group}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Stadium (mobile) */}
                                        <div className="mt-2 text-center sm:hidden">
                                            <span className="text-[10px] text-gray-400">{match.stadium}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ===== RIGHT COLUMN: OPTIONS CARDS ===== */}
                    <div className="space-y-5">
                        {/* Card 1: Profile */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
                                    {session?.user?.image ? (
                                        <img
                                            src={session.user.image}
                                            alt=""
                                            className="w-full h-full rounded-xl object-cover"
                                        />
                                    ) : (
                                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                        </svg>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900">Mi Perfil</h3>
                                    <p className="text-[11px] text-gray-400">{session?.user?.email || 'Sin email'}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs py-1.5">
                                    <span className="text-gray-500">Nombre</span>
                                    <span className="font-semibold text-gray-800">{session?.user?.name || '—'}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs py-1.5 border-t border-gray-50">
                                    <span className="text-gray-500">Email</span>
                                    <span className="font-semibold text-gray-800 truncate max-w-[140px]">{session?.user?.email || '—'}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs py-1.5 border-t border-gray-50">
                                    <span className="text-gray-500">Proveedor</span>
                                    <span className="font-semibold text-gray-800">
                                        {session?.user?.name ? session.user.name === session?.user?.email ? 'Credentials' : 'OAuth' : '—'}
                                    </span>
                                </div>
                            </div>

                            <Link
                                href="/profile"
                                className="mt-4 w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-xl transition-colors"
                            >
                                Ver perfil completo
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>

                        {/* Card 2: Mundial */}
                        <div className="bg-gradient-to-br from-yellow-50 to-amber-50/50 rounded-2xl shadow-sm border border-yellow-200/60 p-6 relative overflow-hidden">
                            {/* Decorative balls */}
                            <div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-200/30 rounded-full blur-xl" />
                            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-amber-200/30 rounded-full blur-xl" />

                            <div className="relative">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center shadow-sm">
                                        <svg className="w-5 h-5 text-white" viewBox="0 0 64 64" fill="currentColor">
                                            <path d="M48 8h-4V4H20v4h-4v4h4v4c0 9.94 6.11 18.43 14.67 21.87C30.72 39.43 26 43.32 26 48v4h-6v4h24v-4h-6v-4c0-4.68-4.72-8.57-8.67-10.13C41.89 34.43 48 25.94 48 16v-4h4V8zM28 8h8v2h-8V8zm4 12c-3.31 0-6-2.69-6-6h12c0 3.31-2.69 6-6 6z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-900">Mundial FIFA 2026</h3>
                                        <p className="text-[11px] text-amber-600 font-medium">Estados Unidos, Canada & Mexico</p>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                                    Descubre todos los partidos del Mundial 2026. Horarios, estadios, banderas, predicciones y mas.
                                </p>

                                <Link
                                    href="/mundial"
                                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md"
                                >
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 64 64" fill="currentColor">
                                        <path d="M48 8h-4V4H20v4h-4v4h4v4c0 9.94 6.11 18.43 14.67 21.87C30.72 39.43 26 43.32 26 48v4h-6v4h24v-4h-6v-4c0-4.68-4.72-8.57-8.67-10.13C41.89 34.43 48 25.94 48 16v-4h4V8zM28 8h8v2h-8V8zm4 12c-3.31 0-6-2.69-6-6h12c0 3.31-2.69 6-6 6z" />
                                    </svg>
                                    Explorar Partidos
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}