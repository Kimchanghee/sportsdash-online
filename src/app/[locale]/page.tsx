import { setRequestLocale } from 'next-intl/server';
import { getAllTodayMatches, type MatchScore } from '@/lib/sports';

interface Props {
  params: Promise<{ locale: string }>;
}

export const revalidate = 60; // 1분 ISR

const LEAGUE_LABEL: Record<string, string> = {
  epl: 'Premier League',
  laliga: 'La Liga',
  kbo: 'KBO',
  mlb: 'MLB',
  nba: 'NBA',
  ufc: 'UFC',
  kleague: 'K League',
};

const LEAGUE_FLAG: Record<string, string> = {
  epl: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  laliga: '🇪🇸',
  kbo: '🇰🇷',
  mlb: '🇺🇸',
  nba: '🇺🇸',
  ufc: '🇺🇸',
  kleague: '🇰🇷',
};

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const matches = await getAllTodayMatches().catch(() => [] as MatchScore[]);
  const live = matches.filter((m) => m.status === 'live');
  const scheduled = matches.filter((m) => m.status === 'scheduled');
  const finished = matches.filter((m) => m.status === 'finished');

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="container mx-auto flex max-w-6xl items-center justify-between p-4">
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-emerald-600">Score</span>Live
          </div>
          <nav className="flex gap-3 text-sm">
            <a href={`/${locale}/league/epl`} className="hover:text-emerald-600">EPL</a>
            <a href={`/${locale}/league/laliga`} className="hover:text-emerald-600">La Liga</a>
            <a href={`/${locale}/league/mlb`} className="hover:text-emerald-600">MLB</a>
            <a href={`/${locale}/league/kbo`} className="hover:text-emerald-600">KBO</a>
          </nav>
        </div>
      </header>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Section title="🔴 Live" matches={live} accent="red" />
        <Section title="🕐 Scheduled" matches={scheduled} />
        <Section title="✅ Finished" matches={finished} />
      </div>
    </main>
  );
}

function Section({ title, matches, accent = 'default' }: { title: string; matches: MatchScore[]; accent?: 'red' | 'default' }) {
  if (matches.length === 0) return null;
  return (
    <section className="mb-8">
      <h2 className={`mb-4 text-xl font-semibold ${accent === 'red' ? 'text-red-600' : 'text-slate-900'}`}>
        {title} <span className="text-sm font-normal text-slate-500">({matches.length})</span>
      </h2>
      <div className="grid gap-2">
        {matches.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
    </section>
  );
}

function MatchCard({ match }: { match: MatchScore }) {
  const isLive = match.status === 'live';
  return (
    <article
      className={`flex items-center justify-between rounded-lg border bg-white p-4 ${
        isLive ? 'border-red-300 ring-1 ring-red-200' : ''
      }`}
    >
      <div className="flex w-32 items-center gap-2 text-xs text-slate-500">
        <span>{LEAGUE_FLAG[match.league]}</span>
        <span>{LEAGUE_LABEL[match.league]}</span>
      </div>
      <div className="flex flex-1 items-center justify-center gap-4 font-medium">
        <span className="w-1/3 text-right truncate">{match.homeTeam.name}</span>
        <span className="px-3 py-1 rounded bg-slate-100 font-mono text-sm">
          {match.homeTeam.score ?? '-'} : {match.awayTeam.score ?? '-'}
        </span>
        <span className="w-1/3 truncate">{match.awayTeam.name}</span>
      </div>
      <div className="w-32 text-right text-xs text-slate-500">
        {isLive && match.liveTimecode && <span className="text-red-600 font-bold">{match.liveTimecode}</span>}
        {match.status === 'scheduled' && new Date(match.startTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
        {match.status === 'finished' && 'Final'}
      </div>
    </article>
  );
}
