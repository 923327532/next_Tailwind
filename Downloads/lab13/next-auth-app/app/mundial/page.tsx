'use client';

import { useEffect, useState, useCallback } from 'react';
import Flag from 'react-world-flags';

// ====== TYPES ======
type MatchStatus = 'upcoming' | 'live' | 'finished';

interface Team {
  name: string;
  code: string;
}

interface Match {
  id: number;
  date: string;
  time: string;
  team1: Team;
  team2: Team;
  group: string;
  stadium: string;
  status: MatchStatus;
  prediction1?: number;
  prediction2?: number;
  score1?: number;
  score2?: number;
}

interface GroupInfo {
  name: string;
  color: string;
  gradient: string;
}

// ====== DATA ======
const GROUPS: Record<string, GroupInfo> = {
  B: { name: 'Grupo B', color: '#ef4444', gradient: 'from-red-500/20 to-red-600/5' },
  C: { name: 'Grupo C', color: '#3b82f6', gradient: 'from-blue-500/20 to-blue-600/5' },
  D: { name: 'Grupo D', color: '#22c55e', gradient: 'from-green-500/20 to-green-600/5' },
  E: { name: 'Grupo E', color: '#f59e0b', gradient: 'from-amber-500/20 to-amber-600/5' },
  F: { name: 'Grupo F', color: '#a855f7', gradient: 'from-purple-500/20 to-purple-600/5' },
};

const MATCHES: Match[] = [
  {
    id: 1,
    date: '2026-06-13',
    time: '14:00',
    team1: { name: 'Catar', code: 'QA' },
    team2: { name: 'Suiza', code: 'CH' },
    group: 'B',
    stadium: 'Estadio de la Bahia de San Francisco',
    status: 'live',
    score1: 1,
    score2: 0,
    prediction1: 35,
    prediction2: 65,
  },
  {
    id: 2,
    date: '2026-06-13',
    time: '17:00',
    team1: { name: 'Brasil', code: 'BR' },
    team2: { name: 'Marruecos', code: 'MA' },
    group: 'C',
    stadium: 'Estadio Nueva York / Nueva Jersey',
    status: 'upcoming',
    prediction1: 72,
    prediction2: 28,
  },
  {
    id: 3,
    date: '2026-06-13',
    time: '20:00',
    team1: { name: 'Haiti', code: 'HT' },
    team2: { name: 'Escocia', code: 'GB' },
    group: 'C',
    stadium: 'Estadio Boston',
    status: 'upcoming',
    prediction1: 20,
    prediction2: 80,
  },
  {
    id: 4,
    date: '2026-06-13',
    time: '23:00',
    team1: { name: 'Australia', code: 'AU' },
    team2: { name: 'Turquia', code: 'TR' },
    group: 'D',
    stadium: 'Estadio BC Place Vancouver',
    status: 'upcoming',
    prediction1: 45,
    prediction2: 55,
  },
  {
    id: 5,
    date: '2026-06-14',
    time: '12:00',
    team1: { name: 'Alemania', code: 'DE' },
    team2: { name: 'Curazao', code: 'CW' },
    group: 'E',
    stadium: 'Estadio Houston',
    status: 'upcoming',
    prediction1: 85,
    prediction2: 15,
  },
  {
    id: 6,
    date: '2026-06-14',
    time: '15:00',
    team1: { name: 'Paises Bajos', code: 'NL' },
    team2: { name: 'Japon', code: 'JP' },
    group: 'F',
    stadium: 'Estadio Dallas',
    status: 'upcoming',
    prediction1: 60,
    prediction2: 40,
  },
  {
    id: 7,
    date: '2026-06-14',
    time: '18:00',
    team1: { name: 'Costa de Marfil', code: 'CI' },
    team2: { name: 'Ecuador', code: 'EC' },
    group: 'E',
    stadium: 'Estadio Filadelfia',
    status: 'upcoming',
    prediction1: 48,
    prediction2: 52,
  },
  {
    id: 8,
    date: '2026-06-14',
    time: '21:00',
    team1: { name: 'Suecia', code: 'SE' },
    team2: { name: 'Tunez', code: 'TN' },
    group: 'F',
    stadium: 'Estadio Mercedes-Benz Atlanta',
    status: 'upcoming',
    prediction1: 55,
    prediction2: 45,
  },
];

// ====== COMPONENTS ======

function Countdown({ targetDate, targetTime }: { targetDate: string; targetTime: string }) {
  const calcRemaining = useCallback(() => {
    const now = new Date();
    const target = new Date(`${targetDate}T${targetTime}:00-05:00`);
    const diff = target.getTime() - now.getTime();

    if (diff <= 0) return 'LIVE';

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    if (days > 0) return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    return `${hours}h ${minutes}m ${seconds}s`;
  }, [targetDate, targetTime]);

  const [remaining, setRemaining] = useState(calcRemaining);

  useEffect(() => {
    const interval = setInterval(() => setRemaining(calcRemaining()), 1000);
    return () => clearInterval(interval);
  }, [calcRemaining]);

  if (remaining === 'LIVE') {
    return (
      <span className="text-xs font-mono tracking-wider text-red-400 font-bold">
        EN VIVO
      </span>
    );
  }

  return (
    <span className="text-xs font-mono tabular-nums text-yellow-300/80">
      {remaining}
    </span>
  );
}

function TeamFlag({ code, name, size = 56 }: { code: string; name: string; size?: number }) {
  return (
    <div
      className="relative rounded-full overflow-hidden border-2 border-white/20 shadow-lg"
      style={{ width: size, height: size }}
    >
      <Flag
        code={code}
        fallback={
          <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white text-xs font-bold">
            {name.substring(0, 2).toUpperCase()}
          </div>
        }
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}

function LiveDot() {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
    </span>
  );
}

function StatusBadge({ status, score1, score2 }: { status: MatchStatus; score1?: number; score2?: number }) {
  if (status === 'live') {
    return (
      <div className="flex items-center gap-2">
        <LiveDot />
        <span className="text-white font-black text-xl tabular-nums tracking-tight">
          {score1} - {score2}
        </span>
      </div>
    );
  }

  if (status === 'finished') {
    return (
      <span className="text-gray-400 font-bold text-xl tabular-nums tracking-tight">
        {score1} - {score2}
      </span>
    );
  }

  return (
    <span className="text-emerald-400 text-[10px] font-semibold tracking-widest bg-emerald-400/15 px-3 py-1 rounded-full uppercase">
      Proximo
    </span>
  );
}

function PredictionBar({ p1, p2 }: { p1: number; p2: number }) {
  return (
    <div className="w-full mt-3">
      <div className="flex justify-between text-[10px] text-gray-500 mb-1 font-medium">
        <span>{p1}% favorito</span>
        <span>{p2}% favorito</span>
      </div>
      <div className="w-full h-1.5 bg-gray-700/40 rounded-full overflow-hidden flex">
        <div
          className="h-full transition-all duration-700 ease-out rounded-l-full"
          style={{ width: `${p1}%`, backgroundColor: '#3b82f6' }}
        />
        <div
          className="h-full transition-all duration-700 ease-out rounded-r-full"
          style={{ width: `${p2}%`, backgroundColor: '#ef4444' }}
        />
      </div>
    </div>
  );
}

function MatchCard({ match }: { match: Match }) {
  const group = GROUPS[match.group];
  const isToday = match.date === '2026-06-13';

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-${group.color}/10 ${
        match.status === 'live'
          ? 'bg-gradient-to-br from-red-500/10 via-gray-900/80 to-gray-900 border-red-500/30'
          : 'bg-gradient-to-br from-gray-800/60 via-gray-900/80 to-gray-900 border-white/5 hover:border-white/20'
      }`}
    >
      {/* Group badge */}
      <div
        className="absolute top-3 right-3 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg z-10"
        style={{ backgroundColor: group.color }}
      >
        Grupo {match.group}
      </div>

      {/* Top accent line */}
      <div className="h-1 w-full" style={{ backgroundColor: group.color }} />

      <div className="p-5">
        {/* Date / Time row */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500 text-xs font-medium">
            {isToday ? '13 Junio 2026' : '14 Junio 2026'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-white/70 text-sm font-semibold tracking-wide">
              {match.time}
            </span>
            {match.status === 'upcoming' && (
              <div className="bg-white/5 rounded-full px-2.5 py-0.5">
                <Countdown targetDate={match.date} targetTime={match.time} />
              </div>
            )}
          </div>
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between gap-2 py-2">
          {/* Team 1 */}
          <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
            <div className="transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-xl">
              <TeamFlag code={match.team1.code} name={match.team1.name} size={60} />
            </div>
            <span className="text-white text-xs font-semibold text-center truncate w-full">
              {match.team1.name}
            </span>
          </div>

          {/* Center: Status */}
          <div className="flex flex-col items-center gap-1 px-2">
            <StatusBadge status={match.status} score1={match.score1} score2={match.score2} />
            {match.status === 'upcoming' && (
              <span className="text-[9px] text-gray-600 font-bold tracking-widest">
                VS
              </span>
            )}
            {match.status === 'live' && (
              <span className="text-[9px] text-red-400 font-bold tracking-widest uppercase bg-red-500/10 px-2 py-0.5 rounded-full">
                En Vivo
              </span>
            )}
          </div>

          {/* Team 2 */}
          <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
            <div className="transform transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-xl">
              <TeamFlag code={match.team2.code} name={match.team2.name} size={60} />
            </div>
            <span className="text-white text-xs font-semibold text-center truncate w-full">
              {match.team2.name}
            </span>
          </div>
        </div>

        {/* Stadium */}
        <div className="mt-3 pt-3 border-t border-white/5 text-center">
          <p className="text-gray-500 text-[11px] font-medium tracking-wide">
            {match.stadium}
          </p>
        </div>

        {/* Prediction */}
        {match.status === 'upcoming' && match.prediction1 !== undefined && match.prediction2 !== undefined && (
          <PredictionBar p1={match.prediction1} p2={match.prediction2} />
        )}
      </div>
    </div>
  );
}

// ====== MAIN PAGE ======
export default function MundialPage() {
  const [search, setSearch] = useState('');
  const [filterGroup, setFilterGroup] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredMatches = MATCHES.filter((m) => {
    const q = search.toLowerCase();
    const matchesSearch =
      m.team1.name.toLowerCase().includes(q) ||
      m.team2.name.toLowerCase().includes(q);
    const matchesGroup = filterGroup === '' || m.group === filterGroup;
    return matchesSearch && matchesGroup;
  });

  const todayMatches = filteredMatches.filter((m) => m.date === '2026-06-13');
  const tomorrowMatches = filteredMatches.filter((m) => m.date === '2026-06-14');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex flex-col items-center justify-center gap-8">
        {/* Trophy */}
        <svg className="w-24 h-24 text-yellow-400 animate-bounce" viewBox="0 0 64 64" fill="currentColor">
          <path d="M48 8h-4V4H20v4h-4v4h4v4c0 9.94 6.11 18.43 14.67 21.87C30.72 39.43 26 43.32 26 48v4h-6v4h24v-4h-6v-4c0-4.68-4.72-8.57-8.67-10.13C41.89 34.43 48 25.94 48 16v-4h4V8zM28 8h8v2h-8V8zm4 12c-3.31 0-6-2.69-6-6h12c0 3.31-2.69 6-6 6z" />
        </svg>

        {/* Loading dots */}
        <div className="flex gap-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        <p className="text-gray-400 text-sm tracking-[0.3em] uppercase font-light animate-pulse">
          Cargando Mundial 2026
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-yellow-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          {/* FIFA badge */}
          <div className="inline-flex items-center gap-2 bg-gray-900/5 backdrop-blur-sm border border-gray-200 rounded-full px-5 py-1.5 mb-5">
            <svg className="w-4 h-4 text-amber-500" viewBox="0 0 64 64" fill="currentColor">
              <path d="M48 8h-4V4H20v4h-4v4h4v4c0 9.94 6.11 18.43 14.67 21.87C30.72 39.43 26 43.32 26 48v4h-6v4h24v-4h-6v-4c0-4.68-4.72-8.57-8.67-10.13C41.89 34.43 48 25.94 48 16v-4h4V8zM28 8h8v2h-8V8zm4 12c-3.31 0-6-2.69-6-6h12c0 3.31-2.69 6-6 6z" />
            </svg>
            <span className="text-amber-600 text-[10px] font-bold tracking-[0.25em] uppercase">
              FIFA World Cup 2026
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-none mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-500 to-amber-500">
              Mundial 2026
            </span>
          </h1>

          <p className="text-gray-400 text-sm font-light tracking-wide max-w-md mx-auto">
            Estados Unidos &bull; Canada &bull; Mexico
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar seleccion..."
                className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all shadow-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Group filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterGroup('')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all shadow-sm ${
                filterGroup === ''
                  ? 'bg-gray-900 text-white border border-gray-800'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Todos
            </button>
            {Object.entries(GROUPS).map(([key, g]) => (
              <button
                key={key}
                onClick={() => setFilterGroup(key)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all border shadow-sm ${
                  filterGroup === key
                    ? 'text-white'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
                style={
                  filterGroup === key
                    ? { borderColor: g.color, backgroundColor: g.color }
                    : {}
                }
              >
                Grupo {key}
              </button>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {filteredMatches.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <p className="text-gray-500 text-sm">No se encontraron partidos.</p>
            <button
              onClick={() => { setSearch(''); setFilterGroup(''); }}
              className="mt-4 text-emerald-600 hover:text-emerald-700 text-xs font-medium underline underline-offset-4 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        )}

        {/* Today */}
        {todayMatches.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              <h2 className="text-gray-700 text-sm font-semibold tracking-widest uppercase">
                Sabado 13 de Junio
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {todayMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        )}

        {/* Tomorrow */}
        {tomorrowMatches.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              <h2 className="text-gray-700 text-sm font-semibold tracking-widest uppercase">
                Domingo 14 de Junio
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {tomorrowMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <div className="text-center pt-8 pb-10 border-t border-gray-200">
          <div className="flex items-center justify-center gap-6 text-[10px] text-gray-400 font-medium tracking-wide">
            <span>Horarios ET</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>Datos informativos</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>API en tiempo real proximamente</span>
          </div>
        </div>
      </div>
    </div>
  );
}