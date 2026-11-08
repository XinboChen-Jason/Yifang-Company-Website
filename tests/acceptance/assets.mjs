import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { gzipSync } from 'node:zlib';

const contract=JSON.parse(await readFile(new URL('./contract.json',import.meta.url),'utf8'));
async function files(dir){const result=[];for(const item of await readdir(dir,{withFileTypes:true})){const path=resolve(dir,item.name);if(item.isDirectory())result.push(...await files(path));else result.push(path);}return result;}
const output=await files(resolve('dist'));
const js=output.filter(path=>extname(path)==='.js');
let compressedJs=0;
for(const path of js)compressedJs+=gzipSync(await readFile(path)).length;
assert.ok(compressedJs<=contract.budgets.jsGzipBytes,'Compressed JS exceeds the approved budget: '+compressedJs);
const arg=process.argv.indexOf('--evidence-root');
const evidence=resolve(arg>=0?process.argv[arg+1]:'../runs/validation');
const browser=JSON.parse(await readFile(resolve(evidence,'browser.json'),'utf8'));
assert.equal(browser.realWechatTested,false);
assert.equal(browser.checks.length,8);
for(const item of browser.checks){assert.equal(item.status,'passed');assert.ok(item.metrics.totalEncodedBytes<=contract.budgets.initialEncodedBytes,'Initial resource budget exceeded at '+item.variant+': '+item.metrics.totalEncodedBytes);}
const docs=['README.md','docs/CONTENT-UPDATES.md','docs/PREVIEW.md','THIRD_PARTY_NOTICES.md'];
for(const file of docs)assert.ok((await stat(resolve(file))).size>100,'Missing substantive handover document: '+file);
const workflow=await readFile(resolve('.github/workflows/preview.yml'),'utf8');
assert.match(workflow,/workflow_dispatch/);
assert.doesNotMatch(workflow,/^\s*push\s*:/m,'Publishing must initially be manually triggered.');
assert.match(workflow,/pages:\s*write/);
assert.match(workflow,/id-token:\s*write/);
for(const match of workflow.matchAll(/\buses:\s*([^\s#]+)/g))assert.match(match[1],/@[a-f0-9]{40}$/,'Actions must use immutable commit pins.');
console.log(JSON.stringify({status:'passed',compressedJsBytes:compressedJs,maximumInitialEncodedBytes:Math.max(...browser.checks.map(x=>x.metrics.totalEncodedBytes)),handoverDocuments:docs.length,realWechatAcceptance:'not performed'}));
