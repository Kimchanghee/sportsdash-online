import { setRequestLocale } from 'next-intl/server';
import { getAllTodayMatches, type MatchScore } from '@/lib/sports';

interface Props {
  params: Promise<{ locale: string }>;
}

export const revalidate = 60; // 1분 ISR

function buildAmazonUrl(keyword: string) {
  const url = new URL('https://www.amazon.com/s');
  url.searchParams.set('k', keyword);
  url.searchParams.set('tag', 'amazonfi00681-20');
  url.searchParams.set('linkCode', 'll2');
  return url.toString();
}

function buildCoupangUrl(keyword: string) {
  const custom = process.env.NEXT_PUBLIC_COUPANG_PARTNER_URL;
  if (custom) return custom;
  const url = new URL('https://www.coupang.com/np/search');
  url.searchParams.set('component', '');
  url.searchParams.set('q', keyword);
  return url.toString();
}

function buildAliExpressUrl(keyword: string) {
  const custom = process.env.NEXT_PUBLIC_ALIEXPRESS_PARTNER_URL;
  if (custom) return custom;
  return `https://www.aliexpress.com/w/wholesale-${encodeURIComponent(keyword.replace(/\s+/g, '-'))}.html`;
}

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
        <section className="mb-8 rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            SportsDash live scores and match schedules
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            Follow live scores, scheduled fixtures, and finished results across EPL, La Liga, MLB,
            KBO, NBA, UFC, and K League in one clean scoreboard built for quick match checks.
          </p>
        </section>

        <Section title="🔴 Live" matches={live} accent="red" />
        <Section title="🕐 Scheduled" matches={scheduled} />
        <Section title="✅ Finished" matches={finished} />

        <section className="mt-8 rounded-xl border bg-white p-5">
          <h2 className="mb-2 text-xl font-semibold">Partner Picks</h2>
          <p className="mb-4 text-sm text-slate-600">응원/트레이닝/중계 관련 추천 링크입니다.</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <a className="rounded-lg border border-amber-300 bg-amber-50 p-4 hover:border-amber-400" href={buildAmazonUrl('sports compression socks')} target="_blank" rel="sponsored noopener noreferrer">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Amazon</p>
              <p className="mt-1 text-sm">Compression Socks</p>
            </a>
            <a className="rounded-lg border border-blue-300 bg-blue-50 p-4 hover:border-blue-400" href={buildCoupangUrl('스포츠 테이핑')} target="_blank" rel="sponsored noopener noreferrer">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Coupang</p>
              <p className="mt-1 text-sm">스포츠 테이핑</p>
            </a>
            <a className="rounded-lg border border-rose-300 bg-rose-50 p-4 hover:border-rose-400" href={buildAliExpressUrl('portable mini scoreboard')} target="_blank" rel="sponsored noopener noreferrer">
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">AliExpress</p>
              <p className="mt-1 text-sm">Mini Scoreboard</p>
            </a>
          </div>
        </section>
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
