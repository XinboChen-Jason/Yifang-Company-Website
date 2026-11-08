import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { resolve, relative, isAbsolute, extname } from 'node:path';
import { gzipSync } from 'node:zlib';
import { chromium } from 'playwright-core';

const contract = JSON.parse(await readFile(new URL('./contract.json', import.meta.url), 'utf8'));
const repo = process.cwd(), dist = resolve(repo, 'dist'), runs = resolve(repo, '../runs');
const arg = process.argv.indexOf('--evidence-root');
const evidence = resolve(arg >= 0 ? process.argv[arg + 1] : resolve(runs, 'validation'));
const rel = relative(runs, evidence);
assert.ok(!isAbsolute(rel) && rel !== '..' && !rel.startsWith('..' + (process.platform === 'win32' ? '\\' : '/')), 'Evidence must remain inside project runs.');
await mkdir(evidence, { recursive: true });
const fallback = process.argv.includes('--fallbacks');
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png', '.webp':'image/webp', '.avif':'image/avif', '.woff2':'font/woff2', '.ico':'image/x-icon', '.txt':'text/plain' };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (!pathname.startsWith(contract.basePath)) { res.writeHead(404).end(); return; }
    let file = resolve(dist, pathname.slice(contract.basePath.length) || 'index.html');
    const path = relative(dist, file);
    if (isAbsolute(path) || path === '..' || path.startsWith('..' + (process.platform === 'win32' ? '\\' : '/'))) { res.writeHead(403).end(); return; }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    let bytes = await readFile(file);
    const extension = extname(file);
    const headers = { 'Content-Type':mime[extension] || 'application/octet-stream', 'Cache-Control':'no-store' };
    if (['.html','.css','.js','.json','.svg','.txt'].includes(extension) && /gzip/.test(req.headers['accept-encoding'] || '')) { bytes = gzipSync(bytes); headers['Content-Encoding']='gzip'; }
    headers['Content-Length'] = bytes.length;
    res.writeHead(200, headers).end(bytes);
  } catch { res.writeHead(404).end(); }
});
await new Promise(done => server.listen(0, '127.0.0.1', done));
const origin = 'http://127.0.0.1:' + server.address().port;
const browser = await chromium.launch({ executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:true });
const receipts = [];
try {
  const variants = fallback ? [
    { name:'no-js',width:390,height:844,javaScriptEnabled:false },
    { name:'reduced-motion',width:390,height:844,reducedMotion:'reduce' },
    { name:'font-fallback',width:390,height:844,blockFonts:true },
  ] : [320,360,375,390,430,768,1366,1440].map(width => ({ name:String(width),width,height:width < 768 ? 844 : 960 }));
  for (const variant of variants) {
    const context = await browser.newContext({ viewport:{width:variant.width,height:variant.height}, javaScriptEnabled:variant.javaScriptEnabled !== false, reducedMotion:variant.reducedMotion || 'no-preference' });
    const page = await context.newPage(), failures=[], external=[], consoleErrors=[];
    await page.route('**/*', route => {
      const request = route.request(),url=request.url();
      if (variant.blockFonts && request.resourceType()==='font') return route.abort();
      if (!url.startsWith(origin+'/') && !url.startsWith('data:') && !url.startsWith('blob:')) { external.push(url); return route.abort(); }
      return route.continue();
    });
    page.on('pageerror', error => consoleErrors.push(error.message));
    page.on('response', response => { if (response.status()>=400) failures.push(response.url()+' '+response.status()); });
    const response = await page.goto(origin+contract.basePath, {waitUntil:'networkidle',timeout:30000});
    assert.equal(response.status(), 200);
    assert.equal(await page.locator('h1').count(), 1);
    await page.locator('h1').waitFor({state:'visible'});
    const geometry = await page.evaluate(() => ({width:innerWidth,scroll:document.documentElement.scrollWidth}));
    assert.ok(geometry.scroll <= geometry.width+1, 'Horizontal overflow at '+variant.name);
    for (const item of contract.navigation) {
      assert.equal(await page.locator('#'+item.id).count(), 1);
      assert.ok(await page.locator('#'+item.id).isVisible(), 'Hidden core section '+item.id);
    }
    for (const family of contract.capabilities) assert.ok((await page.locator('#capabilities').innerText()).includes(family.title));
    const navigation = await page.locator('header nav').allTextContents();
    assert.doesNotMatch(navigation.join(' '), /CAPABILITIES|APPROACH|ABOUT|CONTACT/);
    if (!fallback && variant.width < 768) {
      const menu = page.getByRole('button',{name:/菜单/});
      assert.equal(await menu.count(),1,'A labelled touch menu control is required.');
      await menu.click();
      assert.equal(await menu.getAttribute('aria-expanded'),'true');
      const navLink = page.locator('header nav').getByRole('link',{name:'业务能力',exact:true}).filter({visible:true});
      await navLink.click();
      assert.equal(await menu.getAttribute('aria-expanded'),'false');
      assert.equal(new URL(page.url()).hash,'#capabilities');
      await menu.click(); await page.keyboard.press('Escape');
      assert.equal(await menu.getAttribute('aria-expanded'),'false');
    } else if (variant.javaScriptEnabled === false) {
      const link = page.locator('a[href$="#capabilities"]').filter({visible:true}).first();
      await link.click();
      assert.equal(new URL(page.url()).hash,'#capabilities');
    }
    if (variant.reducedMotion === 'reduce') {
      const infinite = await page.evaluate(() => document.getAnimations().filter(animation => animation.playState==='running' && animation.effect?.getComputedTiming().iterations===Infinity).length);
      assert.equal(infinite,0,'Reduced motion must disable perpetual visual motion.');
    }
    assert.deepEqual(external,[],'Visitor rendering must not depend on third-party domains.');
    assert.deepEqual(failures,[],'Missing local assets');
    assert.deepEqual(consoleErrors,[],'Page runtime errors');
    const metrics = await page.evaluate(() => {
      const nav=performance.getEntriesByType('navigation')[0];
      const resources=performance.getEntriesByType('resource').map(x=>({url:x.name,encodedBytes:x.encodedBodySize}));
      return {documentEncodedBytes:nav.encodedBodySize,resources,totalEncodedBytes:nav.encodedBodySize+resources.reduce((n,x)=>n+x.encodedBytes,0)};
    });
    await page.goto(origin+contract.basePath,{waitUntil:'networkidle'});
    await page.screenshot({path:resolve(evidence,variant.name+'-hero.png')});
    await page.screenshot({path:resolve(evidence,variant.name+'-full.png'),fullPage:true});
    const colour = await page.locator('#about').evaluate(node => getComputedStyle(node).backgroundColor);
    receipts.push({variant:variant.name,viewport:[variant.width,variant.height],geometry,metrics,aboutBackground:colour,screenshots:[variant.name+'-hero.png',variant.name+'-full.png'],status:'passed'});
    await context.close();
  }
  await writeFile(resolve(evidence,fallback?'fallbacks.json':'browser.json'),JSON.stringify({schemaVersion:1,basePath:contract.basePath,browser:'Installed Chrome through Playwright; viewport emulation only',realWechatTested:false,checks:receipts},null,2)+'\n');
  console.log('Protected browser checks passed: '+receipts.length+' scenarios; evidence '+evidence);
} finally { await browser.close(); await new Promise(done => server.close(done)); }
