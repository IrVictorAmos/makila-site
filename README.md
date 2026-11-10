# Makila — site vitrine

Site public de [Makila](https://makila.vercel.app), l'application de don de sang pour toute la RDC :
présentation, outils interactifs (compatibilité des groupes sanguins, test « Puis-je donner ? »),
pages légales exigées par Google et le Play Store, et lien de téléchargement de l'application Android.

- **Angular 22**, composants autonomes, signaux, sans zone.js.
- **Entièrement statique** : chaque page est pré-rendue au build (SEO, partage WhatsApp, chargement rapide),
  puis hydratée progressivement (`@defer (hydrate on viewport)`).
- Aucune base de données, aucun cookie, aucun outil de mesure d'audience.
- Clair et sombre automatiques, accessible au clavier, `prefers-reduced-motion` respecté.

## Pages

| Adresse | Contenu |
|---|---|
| `/` | Accueil : constat, fonctionnement, fonctionnalités, outils interactifs, établissements, carte, FAQ, téléchargement |
| `/confidentialite` | Politique de confidentialité (à indiquer dans Google Cloud et le Play Store) |
| `/conditions` | Conditions d'utilisation |
| `/suppression-compte` | Suppression de compte (exigée par le Play Store) |
| `/telecharger` | Redirection vers le dernier APK Android (voir `vercel.json`) |

## Développer

```bash
npm ci
npm start          # http://localhost:4200
npm run build      # sortie statique : dist/makila-site/browser
```

## Déployer sur Vercel

1. Sur [vercel.com](https://vercel.com), **Add New… > Project**, importez le dépôt `makila-site`.
2. Nom du projet : `makila` (l'adresse devient `makila.vercel.app` si elle est libre).
3. Laissez les réglages par défaut : `vercel.json` fournit la commande de build et le dossier de sortie.
4. **Deploy**. Chaque push sur `main` redéploie automatiquement.

Si l'adresse finale n'est pas `makila.vercel.app`, remplacez-la dans `src/app/site.config.ts`,
`src/index.html`, `public/robots.txt`, `public/sitemap.xml` et `tools/gen-qr.mjs`, puis lancez `npm run gen`.

## Réglages

Tout est dans `src/app/site.config.ts` : adresse e-mail de contact publique, lien Google Play,
date de mise à jour des pages légales. Le lien de téléchargement de l'APK est dans `vercel.json`
(`/telecharger`) : il pointe vers la dernière *release* GitHub de ce dépôt, fichier `makila-android.apk`.

## Contenus générés

`npm run gen` régénère :

- `src/app/data/drc-map.ts` : contour de la RDC (Natural Earth, domaine public) et position des villes ;
- `src/app/shared/icons.ts` : icônes [Lucide](https://lucide.dev) (licence ISC) ;
- `src/app/data/qr.ts` : QR code du lien de téléchargement.

Les captures de `public/screens` viennent des tests visuels de l'application (données fictives).

## Sources des chiffres

- CNTS, via l'OMS Afrique (2023) : <https://www.afro.who.int/node/17943>
- OMS Afrique (2022) : <https://afro.who.int/node/16446>
- OMS, aide-mémoire « Sécurité transfusionnelle et approvisionnement en sang » (2026) :
  <https://www.who.int/news-room/fact-sheets/detail/blood-safety-and-availability>

Polices : Bricolage Grotesque et Plus Jakarta Sans (SIL Open Font License), auto-hébergées.
