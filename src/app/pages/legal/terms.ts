import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo';
import { ContactLink } from '../../shared/contact-link';
import { legalUpdated } from '../../shared/legal-date';

@Component({
  selector: 'app-terms',
  imports: [RouterLink, ContactLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './terms.html',
})
export class Terms {
  protected readonly updated = legalUpdated();
  protected readonly toc = [
    ['objet', 'Objet du service'],
    ['compte', 'Votre compte'],
    ['medical', 'Makila n\'est pas un service médical'],
    ['donneurs', 'Engagements des donneurs'],
    ['etablissements', 'Engagements des établissements'],
    ['contenus', 'Contenus et comportement'],
    ['service', 'Disponibilité du service'],
    ['responsabilite', 'Responsabilité'],
    ['propriete', 'Propriété intellectuelle'],
    ['fin', 'Fin de l\'utilisation'],
    ['droit', 'Droit applicable et contact'],
  ];

  constructor() {
    inject(Seo).set({
      title: "Conditions d'utilisation — Makila",
      description: "Les règles d'utilisation de Makila pour les donneurs de sang et les établissements de santé en RDC.",
      path: '/conditions',
    });
  }
}
