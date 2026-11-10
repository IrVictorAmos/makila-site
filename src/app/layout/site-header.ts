import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { Icon } from '../shared/icon';
import { Logo } from '../shared/logo';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, Icon, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-header.html',
  styleUrl: './site-header.scss',
  host: { '[class.is-scrolled]': 'scrolled()', '[class.is-open]': 'open()' },
})
export class SiteHeader {
  protected readonly open = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly links = [
    { label: 'Fonctionnement', fragment: 'fonctionnement' },
    { label: 'Fonctionnalités', fragment: 'fonctionnalites' },
    { label: 'Établissements', fragment: 'etablissements' },
    { label: 'Questions', fragment: 'faq' },
  ];

  constructor() {
    const destroyRef = inject(DestroyRef);
    inject(Router).events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => this.open.set(false));
    afterNextRender(() => {
      const onScroll = () => this.scrolled.set(window.scrollY > 8);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && this.open.set(false);
      window.addEventListener('keydown', onKey);
      destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('keydown', onKey);
      });
    });
  }

  protected toggle(): void {
    this.open.update((v) => !v);
  }
}
