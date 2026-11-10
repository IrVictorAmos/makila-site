// QR code du lien de téléchargement (pour scanner depuis un ordinateur).
// Usage : node tools/gen-qr.mjs  →  src/app/data/qr.ts
import { writeFileSync } from 'node:fs';
import QRCode from 'qrcode';

const url = 'https://makila.vercel.app/telecharger';
const qr = QRCode.create(url, { errorCorrectionLevel: 'M' });
const size = qr.modules.size;
let d = '';
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    if (qr.modules.get(x, y)) d += `M${x} ${y}h1v1h-1z`;
  }
}
writeFileSync('src/app/data/qr.ts', `// Généré par tools/gen-qr.mjs — encode ${url}
export const QR_SIZE = ${size};
export const QR_PATH = '${d}';
export const QR_URL = '${url}';
`);
console.log('QR', size, 'modules');
