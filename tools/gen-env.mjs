// Avant le build : écrit la configuration publique de vérification des
// attestations à partir des variables d'environnement Vercel.
// MAKILA_SUPABASE_URL      ex. https://xxxx.supabase.co
// MAKILA_SUPABASE_KEY      clé « publishable » (sb_publishable_…), JAMAIS la clé secrète
import { writeFileSync } from 'node:fs';

const url = (process.env.MAKILA_SUPABASE_URL ?? '').trim().replace(/\/+$/, '');
const key = (process.env.MAKILA_SUPABASE_KEY ?? '').trim();
if (key.startsWith('sb_secret_')) {
  console.error('MAKILA_SUPABASE_KEY : utilisez la clé publishable, jamais la clé secrète.');
  process.exit(1);
}
writeFileSync(
  'src/app/verify.env.ts',
  `// Généré par tools/gen-env.mjs — ne pas modifier.\nexport const VERIFY_ENV = { url: ${JSON.stringify(url)}, key: ${JSON.stringify(key)} } as const;\n`,
);
console.log(url && key ? 'Vérification des attestations : configurée' : 'Vérification des attestations : non configurée');
