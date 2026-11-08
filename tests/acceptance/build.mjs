import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const cli = resolve('node_modules/astro/bin/astro.mjs');
if (!existsSync(cli)) throw Error('Approved Astro dependency is not installed.');
for (const command of ['check', 'build']) {
  const result = spawnSync(process.execPath, [cli, command], {
    cwd: process.cwd(), stdio: 'inherit', windowsHide: true,
    env: { ...process.env, CI: 'true', ASTRO_TELEMETRY_DISABLED: '1' },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw Error('Astro ' + command + ' failed.');
}
console.log('Protected verification: Astro type/content check and static build passed.');
