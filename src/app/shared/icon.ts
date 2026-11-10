import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ICONS, IconName } from './icons';

/** Icône Lucide en ligne (trait 2px, couleur héritée). Décorative par défaut. */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'icon', 'aria-hidden': 'true' },
  // innerHTML sur un <span> (et non sur le <svg>) : compatible avec le pré-rendu.
  template: `<span class="i" [innerHTML]="markup()"></span>`,
  styles: `:host{display:inline-flex;inline-size:1.25em;block-size:1.25em;flex:none}
    .i{display:contents}
    :host ::ng-deep svg{inline-size:100%;block-size:100%}`,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly stroke = input(2);
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly markup = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${this.stroke()}" ` +
        `stroke-linecap="round" stroke-linejoin="round" focusable="false">${ICONS[this.name()] ?? ''}</svg>`,
    ),
  );
}
