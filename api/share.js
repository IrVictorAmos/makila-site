// Pages de partage Makila : /p/<id> (publication), /c/<id> (collecte),
// /u/<id> (demande de sang), /e/<id> (établissement).
//
// Rendues côté serveur pour que WhatsApp, Facebook et les SMS affichent un
// aperçu fidèle (titre, texte, image). Les données viennent de la fonction
// publique `public_share` (lecture anonyme, aucune donnée personnelle).
// Clé utilisée : la clé « publishable » du projet, jamais la clé secrète.

const SITE = 'https://makila.vercel.app';
const ZONE = 'Africa/Lubumbashi';
const KINDS = { p: 'post', c: 'campaign', u: 'request', e: 'org' };

// --- Textes (français, anglais, swahili, lingala) ------------------------------
const T = {
  fr: {
    open: "Ouvrir dans l'application",
    download: 'Télécharger Makila',
    call: 'Appeler',
    directions: 'Itinéraire',
    calendar: "Ajouter à l'agenda",
    urgent: 'Urgence sang',
    request: 'Besoin de sang',
    campaign: 'Collecte de sang',
    post: 'Publication',
    org: 'Établissement de santé',
    wanted: (g) => `Sang ${g} recherché`,
    need: (n, p) => `${n} poche${n > 1 ? 's' : ''} de ${p}`,
    compatible: 'Donneurs compatibles',
    closed: 'Cette demande est close. Merci à tous les donneurs !',
    cancelled: 'Cette collecte a été annulée.',
    h24: 'Ouvert 24 h/24',
    bank: 'Banque de sang',
    notFound: "Ce contenu n'est plus disponible",
    notFoundBody: "Il a peut-être été retiré ou le lien est incomplet. Retrouvez toutes les urgences, collectes et informations de santé dans l'application.",
    tagline: 'Le sang qui sauve, partout en RDC',
    why: "Makila met en relation les donneurs, les hôpitaux et les banques de sang de toute la RDC : alertes d'urgence, collectes, carte des établissements et suivi de vos dons.",
    products: { whole_blood: 'sang total', red_cells: 'globules rouges', platelets: 'plaquettes', plasma: 'plasma' },
    locale: 'fr-FR',
  },
  en: {
    open: 'Open in the app',
    download: 'Download Makila',
    call: 'Call',
    directions: 'Directions',
    calendar: 'Add to calendar',
    urgent: 'Urgent blood need',
    request: 'Blood needed',
    campaign: 'Blood drive',
    post: 'Post',
    org: 'Health facility',
    wanted: (g) => `${g} blood needed`,
    need: (n, p) => `${n} unit${n > 1 ? 's' : ''} of ${p}`,
    compatible: 'Compatible donors',
    closed: 'This request is closed. Thank you to every donor!',
    cancelled: 'This blood drive has been cancelled.',
    h24: 'Open 24/7',
    bank: 'Blood bank',
    notFound: 'This content is no longer available',
    notFoundBody: 'It may have been removed or the link is incomplete. Find every emergency, blood drive and health update in the app.',
    tagline: 'Blood that saves lives, across the DRC',
    why: 'Makila connects donors, hospitals and blood banks across the DRC: emergency alerts, blood drives, a map of facilities and a record of your donations.',
    products: { whole_blood: 'whole blood', red_cells: 'red cells', platelets: 'platelets', plasma: 'plasma' },
    locale: 'en-GB',
  },
  sw: {
    open: 'Fungua kwenye programu',
    download: 'Pakua Makila',
    call: 'Piga simu',
    directions: 'Njia',
    calendar: 'Ongeza kwenye kalenda',
    urgent: 'Dharura ya damu',
    request: 'Damu inahitajika',
    campaign: 'Ukusanyaji wa damu',
    post: 'Chapisho',
    org: 'Kituo cha afya',
    wanted: (g) => `Damu ${g} inahitajika`,
    need: (n, p) => `Mifuko ${n} ya ${p}`,
    compatible: 'Wachangiaji wanaofaa',
    closed: 'Ombi hili limefungwa. Asanteni wachangiaji wote!',
    cancelled: 'Ukusanyaji huu umeghairiwa.',
    h24: 'Wazi saa 24',
    bank: 'Benki ya damu',
    notFound: 'Maudhui haya hayapatikani tena',
    notFoundBody: 'Huenda yameondolewa au kiungo hakijakamilika. Pata dharura zote, makusanyo na habari za afya kwenye programu.',
    tagline: 'Damu inayookoa maisha, kote DRC',
    why: 'Makila inaunganisha wachangiaji, hospitali na benki za damu kote DRC: arifa za dharura, makusanyo, ramani ya vituo na kumbukumbu ya michango yako.',
    products: { whole_blood: 'damu kamili', red_cells: 'chembe nyekundu', platelets: 'chembe sahani', plasma: 'plazima' },
    locale: 'sw',
  },
  ln: {
    open: 'Fungola na application',
    download: 'Kitisa Makila',
    call: 'Benga',
    directions: 'Nzela',
    calendar: 'Bakisa na kalandrié',
    urgent: 'Makila esengeli nokinoki',
    request: 'Makila esengeli',
    campaign: 'Bokongoli makila',
    post: 'Sango',
    org: 'Esika ya bokolongono',
    wanted: (g) => `Tozali koluka makila ${g}`,
    need: (n, p) => `Basachet ${n} ya ${p}`,
    compatible: 'Bapesi oyo bakoki',
    closed: 'Bosengi oyo esili. Matondi na bapesi nyonso!',
    cancelled: 'Bokongoli oyo eboyami.',
    h24: 'Efungwami ngonga 24',
    bank: 'Banki ya makila',
    notFound: 'Likambo oyo ezali lisusu te',
    notFoundBody: 'Ekoki kozala balongoli yango to lien ezali mobimba te. Zwa makambo nyonso ya nokinoki, bokongoli mpe sango ya bokolongono na application.',
    tagline: 'Makila oyo ebikisaka, na RDC mobimba',
    why: 'Makila ekangisaka bapesi makila, ba lopitalo mpe ba banki ya makila na RDC mobimba: bayebisi ya nokinoki, bokongoli, karte ya bisika mpe bolandi makabo na yo.',
    products: { whole_blood: 'makila mobimba', red_cells: 'ba globule ya motane', platelets: 'ba plaquette', plasma: 'plasma' },
    locale: 'fr-FR',
  },
};

// Donneurs compatibles (sang total / globules rouges).
const DONORS = {
  'O-': ['O-'],
  'O+': ['O+', 'O-'],
  'A-': ['A-', 'O-'],
  'A+': ['A+', 'A-', 'O+', 'O-'],
  'B-': ['B-', 'O-'],
  'B+': ['B+', 'B-', 'O+', 'O-'],
  'AB-': ['AB-', 'A-', 'B-', 'O-'],
  'AB+': ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
};

const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const httpsUrl = (u) => (typeof u === 'string' && /^https:\/\//.test(u) ? u : null);

function pickLang(req) {
  const q = String(req.query?.lang || '').toLowerCase();
  if (T[q]) return q;
  const al = String(req.headers['accept-language'] || '').toLowerCase();
  for (const part of al.split(',')) {
    const code = part.trim().slice(0, 2);
    if (T[code]) return code;
  }
  return 'fr';
}

async function config(req) {
  let url = (process.env.MAKILA_SUPABASE_URL || '').trim().replace(/\/+$/, '');
  let key = (process.env.MAKILA_SUPABASE_KEY || '').trim();
  if (!url || !key) {
    try {
      const r = await fetch(`https://${req.headers.host}/app-config.json`);
      if (r.ok) {
        const c = await r.json();
        url = String(c.supabaseUrl || '').replace(/\/+$/, '');
        key = String(c.supabaseKey || '');
      }
    } catch {
      /* configuration indisponible */
    }
  }
  if (key.startsWith('sb_secret_')) key = '';
  return url && key ? { url, key } : null;
}

function fmtDate(iso, t, withTime = true) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  try {
    return new Intl.DateTimeFormat(t.locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
      timeZone: ZONE,
    }).format(d);
  } catch {
    return d.toISOString().slice(0, 16).replace('T', ' ');
  }
}

const gcalDate = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

function icon(name) {
  const paths = {
    place: 'M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z',
    event: 'M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zm-2 8h14v10H5V10z',
    call: 'M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z',
    drop: 'M12 2.7S5 10.4 5 15a7 7 0 0 0 14 0c0-4.6-7-12.3-7-12.3z',
    hospital: 'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z',
    clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 11h-5v-2h3V6h2v7z',
    people: 'M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2c-2.3 0-7 1.2-7 3.5V19h14v-2.5C15 14.2 10.3 13 8 13zm8 0c-.3 0-.6 0-1 .1 1.2.8 2 2 2 3.4V19h6v-2.5c0-2.3-4.7-3.5-7-3.5z',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]}"/></svg>`;
}

function render({ t, lang, kind, id, d }) {
  const found = d && d.found;
  const org = (d && d.org) || (kind === 'org' && d) || null;
  let label = '';
  let title = '';
  let body = '';
  let image = null;
  let group = null;
  let notice = '';
  const facts = [];
  const actions = [];

  if (found) {
    if (kind === 'request') {
      group = d.blood_group;
      label = d.urgency === 'normal' ? t.request : t.urgent;
      title = t.wanted(d.blood_group);
      body = t.need(d.units, t.products[d.product] || d.product);
      facts.push(['hospital', [org?.name, d.city].filter(Boolean).join(', ')]);
      if (org?.address) facts.push(['place', org.address]);
      facts.push(['people', `${t.compatible} : ${(DONORS[d.blood_group] || []).join(', ')}`]);
      if (d.status !== 'open') notice = t.closed;
      if (org?.phone) actions.push(['call', t.call, `tel:${org.phone.replace(/[^+\d]/g, '')}`]);
      if (org?.lat != null && org?.lng != null)
        actions.push(['place', t.directions, `https://www.google.com/maps/dir/?api=1&destination=${org.lat},${org.lng}`]);
    } else if (kind === 'campaign') {
      label = t.campaign;
      title = d.title;
      body = d.body;
      facts.push(['event', fmtDate(d.starts_at, t)]);
      facts.push(['place', [d.location, d.address, d.city].filter(Boolean).join(', ')]);
      if (org?.name) facts.push(['hospital', org.name]);
      if (d.cancelled) notice = t.cancelled;
      if (!d.cancelled && d.starts_at && d.ends_at) {
        const cal = new URL('https://calendar.google.com/calendar/render');
        cal.searchParams.set('action', 'TEMPLATE');
        cal.searchParams.set('text', d.title);
        cal.searchParams.set('dates', `${gcalDate(d.starts_at)}/${gcalDate(d.ends_at)}`);
        cal.searchParams.set('location', [d.location, d.address, d.city].filter(Boolean).join(', '));
        cal.searchParams.set('details', `${SITE}/c/${id}`);
        actions.push(['event', t.calendar, cal.toString()]);
      }
      if (d.lat != null && d.lng != null)
        actions.push(['place', t.directions, `https://www.google.com/maps/dir/?api=1&destination=${d.lat},${d.lng}`]);
    } else if (kind === 'post') {
      label = t.post;
      title = d.title;
      body = d.body;
      image = httpsUrl(d.image);
      if (d.starts_at) facts.push(['event', fmtDate(d.starts_at, t)]);
      if (d.location) facts.push(['place', d.location]);
      if (d.phone) {
        facts.push(['call', d.phone]);
        actions.push(['call', t.call, `tel:${d.phone.replace(/[^+\d]/g, '')}`]);
      }
    } else {
      label = t.org;
      title = d.name;
      body = d.tagline || d.body;
      image = httpsUrl(d.image);
      facts.push(['place', [d.address, d.city].filter(Boolean).join(', ')]);
      if (d.phone) facts.push(['call', d.phone]);
      if (d.is_24h) facts.push(['clock', t.h24]);
      if (d.has_blood_bank) facts.push(['drop', t.bank]);
      if (d.phone) actions.push(['call', t.call, `tel:${d.phone.replace(/[^+\d]/g, '')}`]);
      if (d.lat != null && d.lng != null)
        actions.push(['place', t.directions, `https://www.google.com/maps/dir/?api=1&destination=${d.lat},${d.lng}`]);
    }
  } else {
    title = t.notFound;
    body = t.notFoundBody;
  }

  const short = (body || '').replace(/\s+/g, ' ').trim();
  const description = (short.length > 190 ? short.slice(0, 190) + '…' : short) || t.why;
  const pageTitle = found ? `${title} — ${org?.name || 'Makila'}` : `${t.notFound} — Makila`;
  const ogImage = image || httpsUrl(org?.logo) || `${SITE}/og-image.png`;
  const path = { post: 'p', campaign: 'c', request: 'u', org: 'e' }[kind];
  const url = `${SITE}/${path}/${id}`;
  const fallback = encodeURIComponent(`${SITE}/telecharger`);
  const intent = `intent://open/${path}/${id}#Intent;scheme=cd.makila.app;package=cd.makila.app;S.browser_fallback_url=${fallback};end`;
  const logo = httpsUrl(org?.logo);
  const urgent = kind === 'request' && d?.urgency !== 'normal';

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="${found ? 'noindex, follow' : 'noindex'}">
<link rel="canonical" href="${esc(url)}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="Makila">
<meta property="og:title" content="${esc(found ? title : pageTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(ogImage)}">
<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}">
<meta name="theme-color" content="#D61F45">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/bricolage-grotesque.woff2" as="font" type="font/woff2" crossorigin>
<style>
@font-face{font-family:'Bricolage Grotesque';src:url('/fonts/bricolage-grotesque.woff2') format('woff2');font-weight:200 800;font-display:swap}
@font-face{font-family:'Plus Jakarta Sans';src:url('/fonts/plus-jakarta-sans.woff2') format('woff2');font-weight:200 800;font-display:swap}
:root{--brand:#D61F45;--brand-deep:#9E1233;--ink:#1B1B1F;--ink2:#5B5B66;--line:#ECE6E7;--bg:#FBF7F7;--card:#fff;color-scheme:light dark}
@media (prefers-color-scheme:dark){:root{--ink:#F3EEEF;--ink2:#B9B0B2;--line:#3A3234;--bg:#151213;--card:#1F1A1B}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.55 'Plus Jakarta Sans',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.wrap{max-width:560px;margin:0 auto;padding:20px 16px 40px}
header{display:flex;align-items:center;gap:10px;margin-bottom:18px}
header a{display:flex;align-items:center;gap:8px;color:var(--ink);text-decoration:none;font:800 22px/1 'Bricolage Grotesque',sans-serif;letter-spacing:-.5px}
header img{width:30px;height:30px}
header span{margin-left:auto;color:var(--ink2);font-size:13px}
.card{background:var(--card);border:1px solid var(--line);border-radius:26px;overflow:hidden;box-shadow:0 18px 40px -24px rgba(158,18,51,.35)}
.band{display:flex;align-items:center;gap:10px;padding:14px 18px;background:linear-gradient(120deg,${urgent ? 'var(--brand)' : 'var(--brand-deep)'},#6d0c24);color:#fff}
.band b{white-space:nowrap;flex:none;font-size:12px;letter-spacing:.09em;text-transform:uppercase;background:rgba(255,255,255,.18);padding:5px 11px;border-radius:99px}
.band .org{margin-left:auto;display:flex;align-items:center;gap:8px;font-weight:700;font-size:14px;max-width:55%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.band .org img{width:26px;height:26px;border-radius:8px;object-fit:cover;background:#fff}
.hero{width:100%;aspect-ratio:16/9;object-fit:cover;display:block;background:#f2e9ea}
.group{display:grid;place-items:center;padding:26px 0 8px}
.group div{width:118px;height:118px;border-radius:50%;background:var(--brand);color:#fff;display:grid;place-items:center;font:900 44px/1 'Bricolage Grotesque',sans-serif;box-shadow:0 14px 30px -10px rgba(214,31,69,.6)}
.body{padding:20px 22px 22px}
h1{font:800 clamp(24px,6vw,30px)/1.15 'Bricolage Grotesque',sans-serif;letter-spacing:-.6px;margin:0 0 10px}
.text{color:var(--ink2);white-space:pre-line;margin:0 0 16px}
.notice{background:#FFF4D6;color:#6B4E00;border-radius:14px;padding:10px 14px;margin:0 0 16px;font-weight:600}
ul{list-style:none;padding:0;margin:0 0 6px;display:grid;gap:10px}
li{display:flex;gap:10px;align-items:flex-start;font-weight:600}
li svg,.btn svg{width:20px;height:20px;flex:none;fill:var(--brand)}
.actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}
.btn{display:inline-flex;align-items:center;gap:8px;padding:12px 16px;border-radius:14px;border:1px solid var(--line);color:var(--ink);text-decoration:none;font-weight:700;background:var(--card)}
.cta{display:grid;gap:10px;margin:22px 0 0}
.primary{justify-content:center;background:var(--brand);border-color:var(--brand);color:#fff;font-size:17px;padding:15px}
.primary svg{fill:#fff}
.secondary{justify-content:center}
.why{color:var(--ink2);font-size:14px;margin:26px 4px 0;text-align:center}
footer{margin-top:22px;text-align:center;font-size:13px;color:var(--ink2)}
footer a{color:inherit}
</style>
</head>
<body>
<div class="wrap">
<header><a href="/"><img src="/favicon.svg" alt="">makila</a><span>${esc(t.tagline)}</span></header>
<main class="card">
${found ? `<div class="band"><b>${esc(label)}</b>${org?.name && kind !== 'org' ? `<span class="org">${logo ? `<img src="${esc(logo)}" alt="">` : ''}${esc(org.name)}</span>` : ''}</div>` : ''}
${group ? `<div class="group"><div>${esc(group)}</div></div>` : image ? `<img class="hero" src="${esc(image)}" alt="">` : ''}
<div class="body">
<h1>${esc(title)}</h1>
${notice ? `<p class="notice">${esc(notice)}</p>` : ''}
${body ? `<p class="text">${esc(body)}</p>` : ''}
${facts.filter((f) => f[1]).length ? `<ul>${facts.filter((f) => f[1]).map(([i, v]) => `<li>${icon(i)}<span>${esc(v)}</span></li>`).join('')}</ul>` : ''}
${actions.length ? `<div class="actions">${actions.map(([i, l, h]) => `<a class="btn" href="${esc(h)}" rel="noopener">${icon(i)}${esc(l)}</a>`).join('')}</div>` : ''}
</div>
</main>
<div class="cta">
<a class="btn primary" href="${esc(intent)}">${icon('drop')}${esc(t.open)}</a>
<a class="btn secondary" href="/telecharger">${esc(t.download)}</a>
</div>
<p class="why">${esc(t.why)}</p>
<footer><a href="/">makila.vercel.app</a> · <a href="/confidentialite">Confidentialité</a></footer>
</div>
</body>
</html>`;
}

module.exports = async function handler(req, res) {
  const k = String(req.query?.k || '');
  const id = String(req.query?.id || '');
  const kind = KINDS[k];
  const lang = pickLang(req);
  const t = T[lang];
  if (!kind || !/^[0-9a-fA-F-]{36}$/.test(id)) {
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  let d = null;
  const cfg = await config(req);
  if (cfg) {
    try {
      const r = await fetch(`${cfg.url}/rest/v1/rpc/public_share`, {
        method: 'POST',
        headers: { apikey: cfg.key, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_kind: k, p_id: id }),
      });
      if (r.ok) d = await r.json();
    } catch {
      d = null;
    }
  }
  const html = render({ t, lang, kind, id, d });
  res.statusCode = d && d.found ? 200 : 404;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Vary', 'Accept-Language');
  res.setHeader('Cache-Control', d && d.found ? 'public, s-maxage=120, stale-while-revalidate=600' : 'public, s-maxage=30');
  res.end(html);
};
