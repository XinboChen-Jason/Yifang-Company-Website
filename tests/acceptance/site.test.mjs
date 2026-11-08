import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { resolve, extname, relative } from 'node:path';
import { createHash } from 'node:crypto';

const contract = JSON.parse(await readFile(new URL('./contract.json', import.meta.url), 'utf8'));
const root = resolve('dist');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const plain = s => s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const body = plain(html);
const compact = body.replace(/\s/g, '');
async function files(dir) {
  const result = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, item.name);
    if (item.isDirectory()) result.push(...await files(path));
    else result.push(path);
  }
  return result;
}

test('approved company identity and legal footer are present', () => {
  assert.match(html, /<title[^>]*>[^<]*易方/);
  assert.ok(body.includes(contract.brand));
  assert.ok(body.includes(contract.legalEntity));
  assert.ok(compact.includes(contract.slogan.replace(/\s/g, '')));
  assert.ok(body.includes(contract.englishSlogan));
  assert.ok(/<footer\b/i.test(html), 'Legal identity must be in an actual footer.');
});

test('six approved capability families and twenty four services are rendered', () => {
  assert.equal(contract.capabilities.length, 6);
  assert.equal(contract.capabilities.flatMap(x => x.points).length, 24);
  for (const group of contract.capabilities) {
    assert.ok(body.includes(group.title), 'Missing family: ' + group.title);
    for (const point of group.points) assert.ok(body.includes(point), 'Missing service: ' + point);
  }
});

test('navigation is Chinese and each approved section has an anchor target', () => {
  const navs = [...html.matchAll(/<nav\b[^>]*>([\s\S]*?)<\/nav>/gi)];
  assert.ok(navs.length, 'A semantic navigation is required.');
  const navigationText = plain(navs.map(x => x[1]).join(' '));
  for (const item of contract.navigation) {
    assert.ok(navigationText.includes(item.label), 'Missing navigation: ' + item.label);
    assert.ok(new RegExp('id=["\u0027]' + item.id + '["\u0027]').test(html), 'Missing target: ' + item.id);
  }
  assert.doesNotMatch(navigationText, /CAPABILITIES|APPROACH|ABOUT|CONTACT|SYSTEM MAP/i);
});

test('hero has brand proposition without a duplicate method panel', () => {
  const hero = html.match(/<section\b[^>]*id=["\u0027]home["\u0027][^>]*>([\s\S]*?)<\/section>/i);
  assert.ok(hero, 'Hero section id="home" required.');
  const text = plain(hero[1]);
  assert.ok(text.replace(/\s/g, '').includes(contract.slogan.replace(/\s/g, '')));
  assert.doesNotMatch(text, /SYSTEM MAP|方法示意|业务输入|系统结构/);
  assert.doesNotMatch(text, /拆问题[\s\S]*建结构[\s\S]*交付并运行/);
  assert.equal((compact.match(/从问题，到可运行的系统/g) || []).length, 1);
});

test('contact remains a truthful placeholder and private identities are absent', async () => {
  assert.ok(body.includes(contract.contactPlaceholder));
  assert.doesNotMatch(html, /(?:href|src)=["\u0027](?:mailto:|tel:)|微信二维码|创始人|FOUNDER/i);
  for (const file of await files(root)) {
    if (!['.html', '.js', '.css', '.json', '.svg', '.txt', '.xml'].includes(extname(file).toLowerCase())) continue;
    const content = await readFile(file, 'utf8');
    for (const forbidden of contract.privateIdentityHashes) {
      for (let i = 0; i <= content.length - forbidden.length; i++) {
        if (createHash('sha256').update(content.slice(i, i + forbidden.length)).digest('hex') === forbidden.sha256)
          assert.fail('Private identity emitted in: ' + relative(root, file));
      }
    }
  }
});

test('meaningful site content exists in HTML without client rendering', () => {
  for (const value of ['业务能力', '合作方式', '关于易方', '联系信息', contract.legalEntity]) assert.ok(body.includes(value));
  assert.ok(body.length > 400, 'Core company content must be present before JavaScript.');
  assert.doesNotMatch(html, /<iframe\b|<form\b/i, 'No unapproved embeds or data collection.');
});

test('static output contains only website assets and subpath local references', async () => {
  const all = await files(root);
  for (const file of all) {
    const path = relative(root, file).replaceAll('\\', '/');
    assert.doesNotMatch(path, /(?:^|\/)(?:private|inbox|materials|runs|\.runtime|node_modules|\.git)(?:\/|$)/i);
    assert.doesNotMatch(path, /\.(?:zip|pdf|docx|pptx|xlsx|pem|key)$/i);
    assert.doesNotMatch(path, /二维码|名片|创始人|探索过程/);
  }
  for (const match of html.matchAll(/(?:src|href)=["\u0027]([^"\u0027]+)["\u0027]/g)) {
    const value = match[1];
    if (value.startsWith('/') && !value.startsWith('//'))
      assert.ok(value.startsWith(contract.basePath), 'Local reference escapes Pages subpath: ' + value);
    assert.doesNotMatch(value, /^https?:\/\/(?:fonts\.googleapis|fonts\.gstatic|unpkg|cdn\.jsdelivr)\./i);
  }
});
