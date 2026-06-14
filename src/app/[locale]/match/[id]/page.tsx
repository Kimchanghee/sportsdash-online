import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllTodayMatches, type MatchScore } from '@/lib/sports';

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export const revalidate = 30; // 30s for live matches

const LEAGUE_FULL: Record<string, string> = {
  epl: 'English Premier League',
  laliga: 'La Liga (España)',
  kbo: '한국야구위원회 KBO',
  mlb: 'Major League Baseball',
  nba: 'National Basketball Association',
  ufc: 'Ultimate Fighting Championship',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  const matches = await getAllTodayMatches().catch(() => [] as MatchScore[]);
  const match = matches.find((m) => m.id === id);
  if (!match) return {};
  return {
    title: `${match.homeTeam.name} vs ${match.awayTeam.name} — Live Score`,
    description: `${LEAGUE_FULL[match.league]} 라이브 스코어, ${match.homeTeam.name} vs ${match.awayTeam.name}`,
    alternates: { canonical: `/${locale}/match/${id}/` },
  };
}

export default async function MatchDetailPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const matches = await getAllTodayMatches().catch(() => [] as MatchScore[]);
  const match = matches.find((m) => m.id === id);
  if (!match) notFound();

  const startDate = new Date(match.startTime);
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="container mx-auto flex max-w-5xl items-center justify-between p-4">
          <Link href={`/${locale}`} className="text-2xl font-bold">
            <span className="text-emerald-600">Score</span>Live
          </Link>
        </div>
      </header>

      <section className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-2 flex items-center gap-3 text-sm text-slate-500">
          <Link href={`/${locale}/league/${match.league}`} className="hover:text-emerald-600">
            {LEAGUE_FULL[match.league]}
          </Link>
          <span>·</span>
          <time>{startDate.toLocaleString('ko-KR')}</time>
          {match.venue && (<><span>·</span><span>{match.venue}</span></>)}
        </div>

        <article className="rounded-2xl border bg-white p-8">
          <div className="grid grid-cols-3 items-center gap-4">
            <div className="text-center">
              {match.homeTeam.logoUrl && (
                <img src={match.homeTeam.logoUrl} alt={match.homeTeam.name} className="mx-auto w-24 h-24 object-contain" />
              )}
              <div className="mt-2 text-lg font-bold">{match.homeTeam.name}</div>
              <div className="text-xs text-slate-500">HOME</div>
            </div>

            <div className="text-center">
              {isLive && (
                <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white animate-pulse">
                  <span className="h-2 w-2 rounded-full bg-white" />
                  LIVE
                </div>
              )}
              {match.status === 'scheduled' && (
                <div className="mb-2 text-sm text-slate-500">예정</div>
              )}
              {isFinished && (
                <div className="mb-2 text-sm font-medium text-slate-700">종료</div>
              )}
              <div className="text-5xl font-bold tabular-nums">
                <span className={match.homeTeam.score! > (match.awayTeam.score ?? 0) ? 'text-emerald-700' : ''}>
                  {match.homeTeam.score ?? '-'}
                </span>
                <span className="mx-3 text-slate-300">:</span>
                <span className={match.awayTeam.score! > (match.homeTeam.score ?? 0) ? 'text-emerald-700' : ''}>
                  {match.awayTeam.score ?? '-'}
                </span>
              </div>
              {match.liveTimecode && (
                <div className="mt-2 text-sm font-medium text-red-600">{match.liveTimecode}</div>
              )}
            </div>

            <div className="text-center">
              {match.awayTeam.logoUrl && (
                <img src={match.awayTeam.logoUrl} alt={match.awayTeam.name} className="mx-auto w-24 h-24 object-contain" />
              )}
              <div className="mt-2 text-lg font-bold">{match.awayTeam.name}</div>
              <div className="text-xs text-slate-500">AWAY</div>
            </div>
          </div>

          {isLive && (
            <div className="mt-6 rounded-lg bg-emerald-50 p-3 text-center text-xs text-emerald-700">
              📡 30초마다 자동 갱신
            </div>
          )}
        </article>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link
            href={`/${locale}/team/${match.homeTeam.id}`}
            className="rounded-xl border bg-white p-4 hover:border-emerald-400"
          >
            <div className="text-xs text-slate-500">홈 팀 시즌 통계</div>
            <div className="mt-1 font-semibold">{match.homeTeam.name} →</div>
          </Link>
          <Link
            href={`/${locale}/team/${match.awayTeam.id}`}
            className="rounded-xl border bg-white p-4 hover:border-emerald-400"
          >
            <div className="text-xs text-slate-500">원정 팀 시즌 통계</div>
            <div className="mt-1 font-semibold">{match.awayTeam.name} →</div>
          </Link>
        </div>
      </section>
    </main>
  );
}
