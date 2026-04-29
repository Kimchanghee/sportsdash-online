/**
 * 스포츠 라이브 스코어 통합 어댑터
 *
 * 리그별 데이터 소스:
 *  - EPL/LaLiga: Football-data.org (무료 티어, 분당 10회)
 *  - MLB: MLB Stats API (공식, 무료)
 *  - NBA: NBA Stats endpoint (공개)
 *  - KBO: 공공데이터포털 + KBO 공식 사이트
 *  - UFC: ESPN unofficial endpoints
 */

export type SportLeague = 'epl' | 'laliga' | 'kbo' | 'mlb' | 'nba' | 'ufc' | 'kleague';

export interface MatchScore {
  id: string;
  league: SportLeague;
  status: 'scheduled' | 'live' | 'finished' | 'postponed';
  startTime: string; // ISO
  homeTeam: { id: string; name: string; logoUrl?: string; score: number | null };
  awayTeam: { id: string; name: string; logoUrl?: string; score: number | null };
  venue?: string;
  /** 라이브 경기에서 현재 진행 시간/이닝/쿼터 */
  liveTimecode?: string;
}

const FOOTBALL_DATA_KEY = process.env.FOOTBALL_DATA_KEY;

async function footballDataFetch<T>(path: string): Promise<T | null> {
  if (!FOOTBALL_DATA_KEY) return null;
  try {
    const res = await fetch(`https://api.football-data.org/v4${path}`, {
      headers: { 'X-Auth-Token': FOOTBALL_DATA_KEY },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

/* EPL/LaLiga */
export async function getFootballMatches(competitionId: 'PL' | 'PD' | 'BL1' | 'SA' | 'FL1', dateFrom?: string, dateTo?: string): Promise<MatchScore[]> {
  const params = dateFrom && dateTo ? `?dateFrom=${dateFrom}&dateTo=${dateTo}` : '';
  const data = await footballDataFetch<any>(`/competitions/${competitionId}/matches${params}`);
  if (!data) return [];
  const map: Record<string, SportLeague> = { PL: 'epl', PD: 'laliga' };
  return (data.matches || []).map(
    (m: any): MatchScore => ({
      id: `${competitionId}-${m.id}`,
      league: map[competitionId] || 'epl',
      status: m.status === 'IN_PLAY' ? 'live' : m.status === 'FINISHED' ? 'finished' : 'scheduled',
      startTime: m.utcDate,
      homeTeam: { id: String(m.homeTeam?.id), name: m.homeTeam?.name, logoUrl: m.homeTeam?.crest, score: m.score?.fullTime?.home },
      awayTeam: { id: String(m.awayTeam?.id), name: m.awayTeam?.name, logoUrl: m.awayTeam?.crest, score: m.score?.fullTime?.away },
      venue: m.venue,
    })
  );
}

/* MLB Stats API (공식) */
export async function getMlbMatches(date?: string): Promise<MatchScore[]> {
  const d = date || new Date().toISOString().slice(0, 10);
  try {
    const res = await fetch(`https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${d}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    const dates = data.dates?.[0]?.games || [];
    return dates.map(
      (g: any): MatchScore => ({
        id: `mlb-${g.gamePk}`,
        league: 'mlb',
        status:
          g.status?.detailedState === 'In Progress'
            ? 'live'
            : g.status?.detailedState === 'Final'
              ? 'finished'
              : 'scheduled',
        startTime: g.gameDate,
        homeTeam: {
          id: String(g.teams?.home?.team?.id),
          name: g.teams?.home?.team?.name,
          score: g.teams?.home?.score ?? null,
        },
        awayTeam: {
          id: String(g.teams?.away?.team?.id),
          name: g.teams?.away?.team?.name,
          score: g.teams?.away?.score ?? null,
        },
        venue: g.venue?.name,
        liveTimecode: g.linescore?.currentInningOrdinal
          ? `${g.linescore?.inningHalf} ${g.linescore?.currentInningOrdinal}`
          : undefined,
      })
    );
  } catch {
    return [];
  }
}

/* KBO: 공공데이터포털 또는 KBO 공식 사이트 폴링 */
export async function getKboMatches(date?: string): Promise<MatchScore[]> {
  // 공공데이터포털 API key 필요 — KBO 일정/결과 OpenAPI
  // 자리표시자: 실제 운영시 키 발급 후 구현
  return [];
}

/* 통합 — 오늘 모든 리그 경기 한 번에 */
export async function getAllTodayMatches(): Promise<MatchScore[]> {
  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const [epl, laliga, mlb, kbo] = await Promise.all([
    getFootballMatches('PL', today, tomorrow),
    getFootballMatches('PD', today, tomorrow),
    getMlbMatches(today),
    getKboMatches(today),
  ]);
  return [...epl, ...laliga, ...mlb, ...kbo];
}
