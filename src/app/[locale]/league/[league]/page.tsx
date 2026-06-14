import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { getAllTodayMatches, type MatchScore } from '@/lib/sports';

interface Props {
  params: Promise<{ locale: string; league: string }>;
}

export const revalidate = 60;

const SUPPORTED_LOCALES = ['ko', 'en', 'es', 'ja'] as const;

const LEAGUES: Record<string, { label: string; region: string; notes: string[] }> = {
  epl: {
    label: 'Premier League',
    region: 'England',
    notes: [
      'Check kickoff time in your local time zone before comparing live-score pages.',
      'Use form, injuries, and schedule congestion together rather than reading one score line alone.',
      'When no live match is listed, this page still works as a league hub for upcoming fixtures.'
    ],
  },
  laliga: {
    label: 'La Liga',
    region: 'Spain',
    notes: [
      'Late kickoff windows can shift traffic and betting interest, so recheck near match time.',
      'Compare table pressure with recent goal trend before judging a fixture.',
      'Use the league hub first, then open match-specific coverage only when needed.'
    ],
  },
  kbo: {
    label: 'KBO',
    region: 'Korea',
    notes: [
      'KBO rainouts and doubleheaders change schedules quickly during the season.',
      'Starting pitcher and bullpen load matter as much as the previous final score.',
      'Use this page as a clean schedule checkpoint before opening team or ticket pages.'
    ],
  },
  mlb: {
    label: 'MLB',
    region: 'United States',
    notes: [
      'Check probable pitchers, travel, and bullpen usage before reading odds movement.',
      'Doubleheaders can change start times and lineup quality.',
      'Live inning state is more useful than final-score headlines during active games.'
    ],
  },
  nba: {
    label: 'NBA',
    region: 'United States',
    notes: [
      'Back-to-back schedule spots and injury reports can reshape a matchup late.',
      'Use live score, quarter, and team context together before opening deeper analysis.',
      'When the slate is empty, keep the page as a league entry point for the next schedule update.'
    ],
  },
  kleague: {
    label: 'K League',
    region: 'Korea',
    notes: [
      'Check kickoff venue and weather because they can affect pace and attendance.',
      'Compare form across home and away fixtures before relying on table position.',
      'Use this league page as the first step before opening club-level information.'
    ],
  },
  ufc: {
    label: 'UFC',
    region: 'Global',
    notes: [
      'Fight cards change after weigh-ins, injuries, and bout-order updates.',
      'Compare method, round, and opponent style before reading a result in isolation.',
      'Use this page to keep event context internal before moving to external coverage.'
    ],
  },
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    Object.keys(LEAGUES).map((league) => ({ locale, league }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, league } = await params;
  const info = LEAGUES[league];
  if (!SUPPORTED_LOCALES.includes(locale as any) || !info) return {};
  const title = `${info.label} live scores and schedule | SportsDash`;
  const description = `Follow ${info.label} fixtures, live match state, and schedule context in one indexed league hub.`;
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/league/${league}/` },
    openGraph: {
      title,
      description,
      url: `https://sportsdash.online/${locale}/league/${league}/`,
    },
  };
}

export default async function LeaguePage({ params }: Props) {
  const { locale, league } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as any)) notFound();
  const info = LEAGUES[league];
  if (!info) notFound();
  setRequestLocale(locale);

  const matches = await getAllTodayMatches().catch(() => [] as MatchScore[]);
  const leagueMatches = matches.filter((match) => match.league === league);

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="container mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link href={`/${locale}`} className="text-2xl font-bold tracking-tight">
            <span className="text-emerald-600">Score</span>Live
          </Link>
          <Link href={`/${locale}`} className="text-sm text-slate-600 hover:text-emerald-600">All sports</Link>
        </div>
      </header>

      <section className="container mx-auto max-w-5xl px-4 py-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{info.region}</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">{info.label} live scores and schedule</h1>
        <p className="mt-3 max-w-3xl text-slate-600">
          Follow today&apos;s {info.label} fixtures, live match state, and schedule context without being pushed straight into an external scoreboard.
        </p>

        <section className="mt-6 grid gap-4 rounded-xl border bg-white p-6 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-xl font-semibold">League checklist</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              A league page should help a real fan decide what to watch next. These notes keep context visible even when an API has no active match at the exact refresh moment.
            </p>
          </div>
          <ul className="space-y-2 text-sm leading-6 text-slate-700">
            {info.notes.map((note) => (
              <li key={note}>- {note}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-6">
          <h2 className="text-xl font-semibold">Today&apos;s matches</h2>
          {leagueMatches.length ? (
            <div className="mt-4 grid gap-3">
              {leagueMatches.map((match) => (
                <article key={match.id} className="rounded-lg border bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{match.homeTeam.name}</span>
                    <span className="rounded bg-white px-3 py-1 font-mono text-sm">
                      {match.homeTeam.score ?? '-'} : {match.awayTeam.score ?? '-'}
                    </span>
                    <span className="font-semibold">{match.awayTeam.name}</span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{match.status} · {new Date(match.startTime).toLocaleString('ko-KR')}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              No active fixture is available from the live feed right now. Recheck near kickoff, or return to the main board for other leagues that have live data at this refresh.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
