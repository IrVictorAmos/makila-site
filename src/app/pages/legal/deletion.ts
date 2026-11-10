import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo';
import { ContactLink } from '../../shared/contact-link';
import { legalUpdated } from '../../shared/legal-date';

@Component({
  selector: 'app-deletion',
  imports: [RouterLink, ContactLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './deletion.html',
  styles: `
    .steps { display: grid; gap: var(--space-3); padding: 0 !important; list-style: none; counter-reset: s; }
    .steps li {
      display: flex; gap: var(--space-4); align-items: center;
      padding: var(--space-4); border-radius: var(--r-lg);
      background: var(--surface-raised); border: 1px solid var(--line); color: var(--ink) !important;
    }
    .steps li::before {
      counter-increment: s; content: counter(s);
      display: grid; place-items: center; flex: none;
      inline-size: 32px; block-size: 32px; border-radius: 50%;
      background: var(--brand); color: var(--on-brand); font-weight: 800;
    }
  `,
})
export class Deletion {
  protected readonly updated = legalUpdated();

  constructor() {
    inject(Seo).set({
      title: 'Supprimer votre compte Makila',
      description:
        "Comment supprimer votre compte Makila depuis l'application ou par e-mail, et quelles données sont effacées ou conservées.",
      path: '/suppression-compte',
    });
  }
}
