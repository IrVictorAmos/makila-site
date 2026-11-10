/** 481559 → « 481 559 » (espace insécable, usage français). */
export function fmtNumber(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
}
