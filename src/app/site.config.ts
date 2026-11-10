/** Réglages du site, à un seul endroit. */
export const SITE = {
  name: 'Makila',
  url: 'https://makila.vercel.app',
  /** Adresse de contact publique (confidentialité, établissements, presse). Vide = non affichée. */
  contactEmail: 'irvictoramos@gmail.com',
  /** Lien court du site vers l'APK Android (redirection définie dans vercel.json). */
  downloadPath: '/telecharger',
  /** Dernière version publiée de l'application Android. */
  apkUrl: 'https://github.com/IrVictorAmos/makila-site/releases/latest/download/makila-android.apk',
  /** Fiche Google Play, quand elle existera. */
  playStoreUrl: '',
  /** Date de dernière mise à jour des pages légales (AAAA-MM-JJ). */
  legalUpdated: '2026-11-10',
} as const;

export const contactHref = SITE.contactEmail ? `mailto:${SITE.contactEmail}` : '';
