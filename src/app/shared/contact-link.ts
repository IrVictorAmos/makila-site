import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE } from '../site.config';

/** Adresse de contact publique (définie dans site.config.ts). */
@Component({
  selector: 'app-contact-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `@if (email) {<a [href]="'mailto:' + email">{{ email }}</a>} @else {<span class="todo">[adresse de contact à définir]</span>}`,
  styles: `.todo{background:var(--warning-soft);color:var(--ink);padding:0 4px;border-radius:4px;font-weight:600}`,
})
export class ContactLink {
  protected readonly email = SITE.contactEmail;
}
