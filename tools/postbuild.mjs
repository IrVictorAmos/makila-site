// Après le build : page 404 statique pour Vercel.
import { copyFileSync, existsSync } from 'node:fs';
const out = 'dist/makila-site/browser';
const src = `${out}/404/index.html`;
if (existsSync(src)) {
  copyFileSync(src, `${out}/404.html`);
  console.log('404.html prêt');
}
