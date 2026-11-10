import { afterNextRender, ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteFooter } from './layout/site-footer';
import { SiteHeader } from './layout/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#contenu">Aller au contenu</a>
    <app-site-header />
    <main id="contenu" tabindex="-1"><router-outlet /></main>
    <app-site-footer />
  `,
  styles: `main{display:block;outline:none}`,
})
export class App {
  constructor() {
    // Signale au script de secours (index.html) que l'application a démarré.
    afterNextRender(() => ((window as unknown as { __mkReady: boolean }).__mkReady = true));
  }
}
