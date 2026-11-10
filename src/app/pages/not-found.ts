import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../core/seo';
import { Icon } from '../shared/icon';
import { Logo } from '../shared/logo';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, Icon, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="nf container">
      <app-logo [size]="72" />
      <p class="code num">404</p>
      <h1>Cette page n'existe pas, ou plus.</h1>
      <p>Le lien est peut-être incomplet. Revenez à l'accueil pour trouver ce que vous cherchez.</p>
      <div class="actions">
        <a class="btn btn--primary" routerLink="/"><app-icon name="arrow-right" />Retour à l'accueil</a>
        <a class="btn" routerLink="/" fragment="faq">Questions fréquentes</a>
      </div>
    </section>
  `,
  styles: `
    .nf { display: grid; justify-items: center; text-align: center; gap: var(--space-4); padding-block: var(--space-10); }
    .code { font-family: var(--font-display); font-weight: 800; font-size: var(--step-5); color: var(--brand-text); line-height: 1; }
    h1 { font-size: var(--step-3); max-inline-size: 20ch; }
    p { color: var(--ink-2); max-inline-size: 46ch; }
    .actions { display: flex; flex-wrap: wrap; gap: var(--space-3); justify-content: center; margin-block-start: var(--space-3); }
  `,
})
export class NotFound {
  constructor() {
    inject(Seo).set({ title: 'Page introuvable — Makila', description: "Cette page n'existe pas.", path: '/404', noindex: true });
  }
}
