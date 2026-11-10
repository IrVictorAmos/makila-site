import { SITE } from '../site.config';

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

/** « 10 novembre 2026 » */
export function legalUpdated(): string {
  const [y, m, d] = SITE.legalUpdated.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
