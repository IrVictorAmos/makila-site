import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo';
import { ContactLink } from '../../shared/contact-link';
import { legalUpdated } from '../../shared/legal-date';

@Component({
  selector: 'app-privacy',
  imports: [RouterLink, ContactLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './privacy.html',
})
export class Privacy {
  protected readonly updated = legalUpdated();
  protected readonly toc = [
    ['qui', 'Qui sommes-nous'],
    ['donnees', 'Données collectées'],
    ['position', 'Votre position'],
    ['finalites', 'Pourquoi nous les utilisons'],
    ['partage', 'Qui peut les voir'],
    ['prestataires', 'Prestataires techniques'],
    ['conservation', 'Durée de conservation'],
    ['securite', 'Sécurité'],
    ['droits', 'Vos droits'],
    ['age', 'Âge minimum'],
    ['site', 'Ce site web'],
    ['changements', 'Modifications'],
  ];

  constructor() {
    inject(Seo).set({
      title: 'Politique de confidentialité — Makila',
      description:
        "Quelles données Makila collecte, pourquoi, qui peut les voir, combien de temps elles sont conservées et comment exercer vos droits.",
      path: '/confidentialite',
    });
  }
}
