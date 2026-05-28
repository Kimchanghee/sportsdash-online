import { setRequestLocale } from 'next-intl/server';
import { getAllTodayMatches, type MatchScore } from '@/lib/sports';
import SafeInlineAdsterra from '@/components/SafeInlineAdsterra';

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
  epl: '🏴',
  laliga: '🇪🇸',
  kbo: '🇰🇷',
  mlb: '🇺🇸',
  nba: '🇺🇸',
  ufc: '🇺🇸',
  kleague: '🇰🇷',
};

function copy(locale: string) {
  const isKo = locale === 'ko';
  return {
    pageTitle: isKo ? 'SportsDash 실시간 점수와 경기 일정' : 'SportsDash live scores and match schedules',
    pageDesc: isKo
      ? 'EPL, 라리가, MLB, KBO, NBA, UFC, K리그 점수와 일정을 한 번에 확인하고 경기별 흐름을 빠르게 비교하세요.'
      : 'Track live scores, scheduled fixtures, and finished results across EPL, La Liga, MLB, KBO, NBA, UFC, and K League in one place.',
    workflowTitle: isKo ? '빠른 탐색 퍼널' : 'Fast navigation funnel',
    workflowDesc: isKo
      ? '라이브 확인 → 리그 비교 → 분석 글 확인 순서로 이동하면 체류 시간이 늘고 정보 확인이 쉬워집니다.'
      : 'Move from live checks to league comparison and analysis guides to keep context and reduce bounce.',
    stepLive: isKo ? '01. 라이브/예정/종료 상태 확인' : '01. Check live, scheduled, and final states',
    stepLeague: isKo ? '02. 리그별 상세 페이지 비교' : '02. Compare league detail pages',
    stepGuide: isKo ? '03. 분석 가이드로 확장' : '03. Expand with analysis guides',
    guideTitle: isKo ? '경기 분석 가이드' : 'Match analysis guides',
    guideDesc: isKo
      ? '핵심 글과 허브를 통해 경기 맥락을 더 깊게 확인하세요.'
      : 'Use key guides and hubs to deepen context before predictions or purchases.',
    partnerTitle: isKo ? '파트너 추천' : 'Partner picks',
    partnerDesc: isKo ? '응원/트레이닝/중계 관련 추천 링크입니다.' : 'Recommended links for support gear, training, and watch setup.',
    faqTitle: isKo ? '자주 묻는 질문' : 'Frequently asked questions',
    faq: [
      {
        q: isKo ? '점수는 얼마나 자주 갱신되나요?' : 'How often are scores refreshed?',
        a: isKo
          ? '홈은 1분 주기로 갱신되며, 경기 상태에 따라 더 빠르게 반영됩니다.'
          : 'The homepage revalidates every minute, with faster updates depending on match status.',
      },
      {
        q: isKo ? '리그별 페이지에서는 무엇을 볼 수 있나요?' : 'What can I see on league pages?',
        a: isKo
          ? '리그 페이지에서는 해당 리그의 경기 목록, 상태, 시간 정보를 모아 비교할 수 있습니다.'
          : 'League pages aggregate fixtures, status, and kickoff information for focused comparison.',
      },
      {
        q: isKo ? '광고가 경기 확인을 방해하나요?' : 'Do ads interrupt score checking?',
        a: isKo
          ? '아니요. 콘텐츠 하단의 안전한 인라인 슬롯만 사용하며 팝업/강제 이동은 비활성화되어 있습니다.'
          : 'No. Only safe inline slots below content are used; popup and redirect behaviors remain disabled.',
      },
    ],
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = copy(locale);

  const matches = await getAllTodayMatches().catch(() => [] as MatchScore[]);
  const live = matches.filter((m) => m.status === 'live');
  const scheduled = matches.filter((m) => m.status === 'scheduled');
  const finished = matches.filter((m) => m.status === 'finished');

  const guideCards = [
    {
      href: `/${locale}/league/epl`,
      title: 'EPL form snapshot',
      desc: locale === 'ko' ? '프리미어리그 경기 흐름 요약' : 'Current Premier League match flow',
    },
    {
      href: '/blog/nba-playoffs-2026-bracket/',
      title: 'NBA playoffs guide',
      desc: locale === 'ko' ? '브래킷과 핵심 포인트 정리' : 'Bracket context and key checkpoints',
    },
    {
      href: '/blog/kbo-2026-team-rankings/',
      title: 'KBO rankings watch',
      desc: locale === 'ko' ? '팀 전력과 순위 흐름 확인' : 'Team strength and rankings movement',
    },
    {
      href: '/blog/epl-fixtures-2026-2027/',
      title: 'EPL fixtures planner',
      desc: locale === 'ko' ? '일정 밀집 구간 빠른 확인' : 'Fixture congestion planning view',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: locale === 'ko' ? 'ko-KR' : 'en-US',
    mainEntity: c.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

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
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">{c.pageTitle}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{c.pageDesc}</p>
        </section>

        <section className="mb-8 rounded-xl border bg-white p-5">
          <h2 className="mb-2 text-xl font-semibold">{c.workflowTitle}</h2>
          <p className="mb-4 text-sm text-slate-600">{c.workflowDesc}</p>
          <div className="grid gap-3 md:grid-cols-3">
            <a href="#live" className="rounded-lg border bg-slate-50 p-4 hover:border-emerald-400">
              <p className="text-sm font-semibold text-slate-900">{c.stepLive}</p>
            </a>
            <a href={`/${locale}/league/epl`} className="rounded-lg border bg-slate-50 p-4 hover:border-emerald-400">
              <p className="text-sm font-semibold text-slate-900">{c.stepLeague}</p>
            </a>
            <a href="/blog/" className="rounded-lg border bg-slate-50 p-4 hover:border-emerald-400">
              <p className="text-sm font-semibold text-slate-900">{c.stepGuide}</p>
            </a>
          </div>
        </section>

        <section className="mb-8 rounded-xl border bg-white p-5">
          <h2 className="mb-2 text-xl font-semibold">{c.guideTitle}</h2>
          <p className="mb-4 text-sm text-slate-600">{c.guideDesc}</p>
          <div className="grid gap-3 md:grid-cols-2">
            {guideCards.map((card) => (
              <a key={card.href} href={card.href} className="rounded-lg border bg-slate-50 p-4 hover:border-emerald-400">
                <p className="text-sm font-semibold text-slate-900">{card.title}</p>
                <p className="mt-1 text-sm text-slate-600">{card.desc}</p>
              </a>
            ))}
          </div>
        </section>

        <div id="live">
          <Section title="🔴 Live" matches={live} accent="red" />
        </div>
        <Section title="🕐 Scheduled" matches={scheduled} />
        <Section title="✅ Finished" matches={finished} />

        <section className="mt-8 rounded-xl border bg-white p-5">
          <h2 className="mb-2 text-xl font-semibold">{c.partnerTitle}</h2>
          <p className="mb-4 text-sm text-slate-600">{c.partnerDesc}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            <a className="rounded-lg border border-amber-300 bg-amber-50 p-4 hover:border-amber-400" href={buildAmazonUrl('sports compression socks')} target="_blank" rel="sponsored noopener noreferrer nofollow" data-affiliate-link>
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Amazon</p>
              <p className="mt-1 text-sm">Compression Socks</p>
            </a>
            <a className="rounded-lg border border-blue-300 bg-blue-50 p-4 hover:border-blue-400" href={buildCoupangUrl('스포츠 테이핑')} target="_blank" rel="sponsored noopener noreferrer nofollow" data-affiliate-link>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Coupang</p>
              <p className="mt-1 text-sm">스포츠 테이핑</p>
            </a>
            <a className="rounded-lg border border-rose-300 bg-rose-50 p-4 hover:border-rose-400" href={buildAliExpressUrl('portable mini scoreboard')} target="_blank" rel="sponsored noopener noreferrer nofollow" data-affiliate-link>
              <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">AliExpress</p>
              <p className="mt-1 text-sm">Mini Scoreboard</p>
            </a>
          </div>
        </section>

        <section className="mt-8 rounded-xl border bg-white p-5">
          <h2 className="mb-3 text-xl font-semibold">{c.faqTitle}</h2>
          <div className="grid gap-3">
            {c.faq.map((item) => (
              <details key={item.q} className="rounded-lg border bg-slate-50 p-4">
                <summary className="cursor-pointer text-sm font-semibold text-slate-900">{item.q}</summary>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <SafeInlineAdsterra placement="homepage-inline" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
        <span className="w-1/3 truncate text-right">{match.homeTeam.name}</span>
        <span className="rounded bg-slate-100 px-3 py-1 font-mono text-sm">
          {match.homeTeam.score ?? '-'} : {match.awayTeam.score ?? '-'}
        </span>
        <span className="w-1/3 truncate">{match.awayTeam.name}</span>
      </div>
      <div className="w-32 text-right text-xs text-slate-500">
        {isLive && match.liveTimecode && <span className="font-bold text-red-600">{match.liveTimecode}</span>}
        {match.status === 'scheduled' && new Date(match.startTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
        {match.status === 'finished' && 'Final'}
      </div>
    </article>
  );
}
