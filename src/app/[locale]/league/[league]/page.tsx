import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getAllTodayMatches, type MatchScore } from '@/lib/sports';

interface Props {
  params: Promise<{ locale: string; league: string }>;
}

export const revalidate = 60;

const SUPPORTED_LOCALES = ['ko', 'en', 'es'] as const;
const LEAGUE_LABEL: Record<string, string> = {
  epl: 'Premier League',
  laliga: 'La Liga',
  kbo: 'KBO',
  mlb: 'MLB',
  nba: 'NBA',
  kleague: 'K League',
  ufc: 'UFC',
};

export default async function LeaguePage({ params }: Props) {
  const { locale, league } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as any) || !LEAGUE_LABEL[league]) notFound();
  setRequestLocale(locale);

  const matches = (await getAllTodayMatches().catch(() => [] as MatchScore[])).filter((m) => m.league === league);

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white p-4">
        <div className="container mx-auto flex max-w-6xl items-center justify-between">
          <Link href={`/${locale}`} className="text-2xl font-bold"><span className="text-emerald-600">Score</span>Live</Link>
          <Link href={`/${locale}`} className="text-sm text-slate-600 hover:text-emerald-600">All scores</Link>
        </div>
      </header>

      <section className="container mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-4xl font-bold tracking-tight">{LEAGUE_LABEL[league]} scores</h1>
        <p className="mt-3 text-slate-600">Today&apos;s schedule, live scores and recent results.</p>

        <div className="mt-6 grid gap-3">
          {matches.length ? matches.map((match) => (
            <article key={match.id} className="rounded-xl border bg-white p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">{match.status}</div>
              <div className="mt-2 flex items-center justify-between gap-4 font-semibold">
                <span>{match.homeTeam.name}</span>
                <span className="rounded bg-slate-100 px-3 py-1 font-mono">
                  {match.homeTeam.score ?? '-'} : {match.awayTeam.score ?? '-'}
                </span>
                <span>{match.awayTeam.name}</span>
              </div>
            </article>
          )) : (
            <div className="rounded-xl border bg-white p-6 text-slate-600">
              No live fixtures are available right now. This league page remains active for schedule updates.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
