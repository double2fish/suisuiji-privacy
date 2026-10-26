import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const required = ['OPERATOR_NAME', 'SUPPORT_EMAIL', 'APP_FILING_NUMBER'];
const missing = required.filter((key) => !process.env[key]?.trim());
if (missing.length > 0) {
  throw new Error(`Missing GitHub Pages variables: ${missing.join(', ')}`);
}

const config = {
  operatorName: process.env.OPERATOR_NAME.trim(),
  supportEmail: process.env.SUPPORT_EMAIL.trim(),
  appFilingNumber: process.env.APP_FILING_NUMBER.trim(),
  appVersion: process.env.APP_VERSION?.trim() || '1.0.1',
  effectiveDate: process.env.EFFECTIVE_DATE?.trim() || '2026-10-25',
};

const dist = join(process.cwd(), 'dist');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const file of ['index.html', 'styles.css', 'policy.js']) {
  await cp(join(process.cwd(), file), join(dist, file));
}
await writeFile(
  join(dist, 'site-config.js'),
  `window.SUISUIJI_POLICY_CONFIG = ${JSON.stringify(config, null, 2)};\n`,
  'utf8',
);
await writeFile(join(dist, '.nojekyll'), '', 'utf8');
console.log('GitHub Pages artifact created in dist/.');
