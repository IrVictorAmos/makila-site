// Extrait les icônes Lucide (licence ISC) utilisées par le site.
// Usage : node tools/gen-icons.mjs  →  src/app/shared/icons.ts
import { readFileSync, writeFileSync } from 'node:fs';
const names = ['droplet','heart-pulse','bell-ring','map-pin','users','clock','check','x','chevron-down','arrow-right',
  'download','hospital','qr-code','calendar-check','megaphone','package','pill','map','wifi-off','languages',
  'shield-check','lock','eye-off','volume-2','file-check','scan-line','award','smartphone','menu','activity','phone',
  'mail','arrow-up-right','info','siren','hand-heart','building-2','calendar-plus','badge-check','message-circle-warning',
  'user-round-check','timer','circle-help','rotate-ccw','trash-2','route'];
const icons = {};
for (const n of names) {
  const svg = readFileSync(`node_modules/lucide-static/icons/${n}.svg`, 'utf8');
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/\s*\n\s*/g, '').trim();
  icons[n] = inner;
}
const out = `// Généré par tools/gen-icons.mjs — icônes Lucide (https://lucide.dev, licence ISC).
export const ICONS: Record<string, string> = ${JSON.stringify(icons, null, 2)};
export type IconName = ${names.map((n) => `'${n}'`).join(' | ')};
`;
writeFileSync('src/app/shared/icons.ts', out);
console.log('icônes :', names.length);
