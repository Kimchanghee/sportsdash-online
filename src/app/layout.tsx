import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'SportsDash — 실시간 스포츠 점수 대시보드',
  description: 'EPL·KBO·NBA·MLB·UEFA 실시간 점수, 일정, 순위. 다중 리그 통합 스포츠 대시보드.',
  keywords: ['실시간 점수', 'EPL 점수', 'KBO', 'NBA', 'MLB', '챔피언스리그', 'live score', 'sports score', 'sports dashboard'],
  metadataBase: new URL('https://sportsdash.online'),
  alternates: {
    canonical: '/',
    languages: { ko: '/ko', en: '/en', 'x-default': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://sportsdash.online',
    siteName: 'SportsDash',
    title: 'SportsDash — 실시간 스포츠 점수',
    description: 'EPL·KBO·NBA·MLB 실시간 점수 통합 대시보드',
  },
  twitter: { card: 'summary_large_image', title: 'SportsDash', description: '실시간 스포츠 점수' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                { '@type': 'Organization', '@id': 'https://sportsdash.online#org', name: 'SportsDash', url: 'https://sportsdash.online' },
                { '@type': 'WebSite', '@id': 'https://sportsdash.online#site', url: 'https://sportsdash.online', name: 'SportsDash', inLanguage: 'ko-KR', publisher: { '@id': 'https://sportsdash.online#org' } },
                { '@type': 'WebApplication', name: 'SportsDash', applicationCategory: 'SportsApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
