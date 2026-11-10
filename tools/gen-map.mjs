// Génère le contour de la RDC et la position des villes (projection Mercator)
// à partir de Natural Earth (world-atlas, domaine public).
// Usage : node tools/gen-map.mjs  →  src/app/data/drc-map.ts
import { readFileSync, writeFileSync } from 'node:fs';
import { feature } from 'topojson-client';
import { geoMercator, geoPath } from 'd3-geo';

const W = 600;
const H = 560;
const world = JSON.parse(readFileSync('node_modules/world-atlas/countries-50m.json', 'utf8'));
const countries = feature(world, world.objects.countries);
const drc = countries.features.find((f) => f.id === '180');
if (!drc) throw new Error('RDC introuvable');

const projection = geoMercator().fitExtent([[12, 12], [W - 12, H - 12]], drc);
const path = geoPath(projection);
const round = (d) => d.replace(/(\d+\.\d{1})\d+/g, '$1');

const cities = [
  ['Kinshasa', -4.325, 15.322, 'capitale'],
  ['Lubumbashi', -11.664, 27.479],
  ['Mbuji-Mayi', -6.136, 23.59],
  ['Kisangani', 0.515, 25.191],
  ['Kananga', -5.896, 22.417],
  ['Bukavu', -2.508, 28.86],
  ['Goma', -1.679, 29.222],
  ['Kolwezi', -10.716, 25.473],
  ['Matadi', -5.817, 13.45],
  ['Mbandaka', 0.048, 18.26],
  ['Kindu', -2.95, 25.92],
  ['Bunia', 1.566, 30.252],
  ['Uvira', -3.395, 29.138],
  ['Kikwit', -5.041, 18.817],
  ['Gemena', 3.255, 19.773],
  ['Isiro', 2.773, 27.616],
  ['Kalemie', -5.947, 29.194],
  ['Tshikapa', -6.416, 20.8],
].map(([name, lat, lng, kind]) => {
  const [x, y] = projection([lng, lat]);
  return { name, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, capital: kind === 'capitale' };
});

const out = `// Fichier généré par tools/gen-map.mjs — ne pas modifier à la main.
// Contour : Natural Earth 1:50m (domaine public), projection Mercator.
export const DRC_VIEWBOX = '0 0 ${W} ${H}';
export const DRC_PATH = '${round(path(drc))}';
export interface MapCity { name: string; x: number; y: number; capital: boolean }
export const DRC_CITIES: MapCity[] = ${JSON.stringify(cities, null, 2)};
`;
writeFileSync('src/app/data/drc-map.ts', out);
console.log('ok', out.length, 'octets');
