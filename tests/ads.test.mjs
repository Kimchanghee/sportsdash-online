import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
test('ads require exact true opt-in and retain account verification', () => {
 const config=readFileSync('src/site.config.ts','utf8');
 assert.ok(config.includes("adsEnabled: env.PUBLIC_ADS_ENABLED === 'true'"));
 const base=readFileSync('src/layouts/Base.astro','utf8');
 assert.ok(base.includes('{site.adsEnabled && <script async'));
 assert.ok(base.includes('name="google-adsense-account"'));
 assert.ok(readFileSync('public/ads.txt','utf8').includes('pub-4490818204529253'));
});
test('default build has no advertising loader and privacy does not promise a CMP', () => {
 const html=readFileSync('dist/index.html','utf8');
 assert.ok(!html.includes('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'));
 assert.ok(html.includes('name="google-adsense-account"'));
 assert.ok(!readFileSync('src/pages/privacy.astro','utf8').includes('CMP)을 통해 동의 여부를 선택'));
});
