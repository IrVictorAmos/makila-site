// Après le build : page 404 statique pour Vercel, liens d'application Android.
import { copyFileSync, cpSync, existsSync, mkdirSync } from 'node:fs';
const out = 'dist/makila-site/browser';
const src = `${out}/404/index.html`;
if (existsSync(src)) {
  copyFileSync(src, `${out}/404.html`);
  console.log('404.html prêt');
}

// Liens d'application Android (ouvrir /p, /c, /u, /e dans l'app) : le dossier
// caché .well-known n'est pas toujours copié par le build Angular.
if (existsSync('public/.well-known')) {
  mkdirSync(`${out}/.well-known`, { recursive: true });
  cpSync('public/.well-known', `${out}/.well-known`, { recursive: true });
  console.log('.well-known prêt');
}
