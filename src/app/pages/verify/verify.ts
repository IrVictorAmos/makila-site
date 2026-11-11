import { ChangeDetectionStrategy, Component, PLATFORM_ID, afterNextRender, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Seo } from '../../core/seo';
import { VERIFY_ENV } from '../../verify.env';

/** Réponse publique de verify_certificate (identité masquée). */
interface VerifyResult {
  found: boolean;
  kind?: 'group' | 'donation';
  code?: string;
  status?: 'valid' | 'revoked';
  blood_group?: string;
  confirmed?: boolean;
  issued_on?: string;
  donated_on?: string;
  org_name?: string;
  org_city?: string;
  holder?: string;
  birth_year?: string;
}

const CODE = /MKA-[A-Z0-9]{4}-[A-Z0-9]{4}|MKD-[A-Z0-9]{10}/;

/**
 * Vérification publique d'une attestation Makila (QR code ou numéro).
 * Aucune connexion requise ; seules des informations masquées sont affichées.
 */
@Component({
  selector: 'app-verify',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './verify.html',
  styles: `
    .verify { max-inline-size: 640px; margin-inline: auto; padding-block: var(--space-8) var(--space-10); }
    h1 { margin-block: var(--space-2) var(--space-3); }
    .lead { font-size: var(--step-1); color: var(--ink-2); line-height: 1.5; }
    form { display: flex; gap: var(--space-3); margin-block: var(--space-6); flex-wrap: wrap; }
    input {
      flex: 1 1 240px; padding: 14px 16px; border-radius: var(--r-md); border: 1px solid var(--line);
      background: var(--surface-raised); color: var(--ink); font: inherit; text-transform: uppercase; letter-spacing: 0.06em;
    }
    input:focus { outline: 2px solid var(--brand); outline-offset: 1px; }
    .card { padding: var(--space-6); border-radius: var(--r-lg); border: 1px solid var(--line); background: var(--surface-raised); }
    .card.ok { border-color: color-mix(in srgb, #0fa97b 45%, transparent); background: color-mix(in srgb, #0fa97b 8%, var(--surface-raised)); }
    .card.ko { border-color: color-mix(in srgb, #d61f45 45%, transparent); background: color-mix(in srgb, #d61f45 7%, var(--surface-raised)); }
    .verdict { display: flex; align-items: center; gap: var(--space-3); font-size: 1.25rem; font-weight: 800; margin: 0 0 var(--space-4); }
    .ok .verdict { color: #0b8a64; }
    .ko .verdict { color: #b0173a; }
    .group { display: inline-grid; place-items: center; inline-size: 72px; block-size: 72px; border-radius: 50%;
      background: var(--brand); color: var(--on-brand); font-weight: 800; font-size: 1.6rem; float: inline-end; }
    dl { display: grid; grid-template-columns: max-content 1fr; gap: 6px 16px; margin: 0; }
    dt { color: var(--ink-2); }
    dd { margin: 0; font-weight: 700; }
    .note { color: var(--ink-2); font-size: 0.9rem; margin-block-start: var(--space-6); }
  `,
})
export class Verify {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly configured = !!(VERIFY_ENV.url && VERIFY_ENV.key);
  protected code = '';
  protected readonly loading = signal(false);
  protected readonly result = signal<VerifyResult | null>(null);
  protected readonly error = signal('');

  constructor() {
    inject(Seo).set({
      title: 'Vérifier une attestation Makila',
      description:
        "Vérifiez l'authenticité d'une attestation de groupe sanguin ou de don délivrée via Makila : scannez le QR code ou saisissez son numéro.",
      path: '/verifier',
    });
    afterNextRender(() => {
      const c = this.route.snapshot.queryParamMap.get('c');
      if (c) {
        this.code = c;
        void this.check();
      }
    });
  }

  protected async check(): Promise<void> {
    if (!this.browser) return;
    this.error.set('');
    this.result.set(null);
    const code = CODE.exec(this.code.trim().toUpperCase())?.[0];
    if (!code) {
      this.result.set({ found: false });
      return;
    }
    if (!this.configured) {
      this.error.set("La vérification en ligne n'est pas encore activée sur ce site. Utilisez l'application Makila.");
      return;
    }
    this.loading.set(true);
    try {
      const res = await fetch(`${VERIFY_ENV.url}/rest/v1/rpc/verify_certificate`, {
        method: 'POST',
        headers: { apikey: VERIFY_ENV.key, 'Content-Type': 'application/json' },
        body: JSON.stringify({ p_code: code }),
      });
      if (!res.ok) throw new Error(String(res.status));
      this.result.set((await res.json()) as VerifyResult);
      void this.router.navigate([], { queryParams: { c: code }, replaceUrl: true });
    } catch {
      this.error.set('Vérification impossible pour le moment. Vérifiez votre connexion et réessayez.');
    } finally {
      this.loading.set(false);
    }
  }

  protected date(v?: string): string {
    if (!v) return '';
    const d = new Date(v);
    return isNaN(d.getTime()) ? v : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  }
}
