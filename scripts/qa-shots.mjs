import { chromium } from '../../_qa-tools/node_modules/playwright/index.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
const origin='http://127.0.0.1:4437';
mkdirSync('qa/screens',{recursive:true});
const preview=spawn(process.execPath,['node_modules/astro/astro.js','preview','--port','4437','--host','127.0.0.1'],{env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'},stdio:'inherit'});
let browser;
const results=[];
try {
 for(let i=0;i<60;i++){if(preview.exitCode!==null)throw new Error('preview exited');try{if((await fetch(origin)).ok)break;}catch{};await new Promise(r=>setTimeout(r,500));}
 browser=await chromium.launch({headless:true,channel:"msedge"});
 for(const width of [390,1440]) for(const [name,route] of [['home','/'],['guide','/guides/home-dumbbell-buying-checklist/'],['category','/category/running/']]) {
  const page=await browser.newPage({viewport:{width,height:900}, reducedMotion:'reduce'});
  await page.route(/googlesyndication|google-analytics|googletagmanager/,r=>r.abort());
  await page.addInitScript(()=>{window.__cls=0;new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__cls+=e.value}).observe({type:'layout-shift',buffered:true});});
  const response=await page.goto(origin+route); await page.waitForLoadState('networkidle');
  const metrics=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,cls:window.__cls,h1:document.querySelector('h1')?.textContent}));
  await page.keyboard.press('Tab'); const focus=await page.evaluate(()=>({tag:document.activeElement.tagName,outline:getComputedStyle(document.activeElement).outlineStyle}));
  await page.screenshot({path:'qa/screens/'+name+'-'+width+'.png',fullPage:true});
  if(name==='guide'){await page.locator('input[type=checkbox]').first().check();await page.reload();metrics.persisted=await page.locator('input[type=checkbox]').first().isChecked();}
  results.push({route,width,status:response.status(),...metrics,focus}); await page.close();
 }
}finally{await browser?.close();preview.kill();}
writeFileSync('qa/browser-results.json',JSON.stringify(results,null,2));
if(results.some(r=>r.status!==200||r.overflow||r.cls>0.1||r.focus.outline==='none'||r.persisted===false))process.exit(1);
console.log(JSON.stringify(results,null,2));

