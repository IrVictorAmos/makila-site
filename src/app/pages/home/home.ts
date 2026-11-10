import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Seo } from '../../core/seo';
import { Compat } from './sections/compat';
import { Coverage } from './sections/coverage';
import { Download } from './sections/download';
import { Eligibility } from './sections/eligibility';
import { Faq } from './sections/faq';
import { Features } from './sections/features';
import { Hero } from './sections/hero';
import { Orgs } from './sections/orgs';
import { Stats } from './sections/stats';
import { Steps } from './sections/steps';
import { Trust } from './sections/trust';

@Component({
  selector: 'app-home',
  imports: [Hero, Stats, Steps, Compat, Features, Eligibility, Orgs, Coverage, Trust, Faq, Download],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Le haut de page s'hydrate tout de suite ; le reste seulement quand il devient visible.
  template: `
    <app-hero />
    @defer (hydrate on viewport) { <app-stats /> }
    @defer (hydrate on viewport) { <app-steps /> }
    @defer (hydrate on viewport) { <app-features /> }
    @defer (hydrate on viewport) { <app-compat /> }
    @defer (hydrate on viewport) { <app-eligibility /> }
    @defer (hydrate on viewport) { <app-orgs /> }
    @defer (hydrate on viewport) { <app-coverage /> }
    @defer (hydrate on viewport) { <app-trust /> }
    @defer (hydrate on viewport) { <app-faq /> }
    @defer (hydrate on viewport) { <app-download /> }
  `,
})
export class Home {
  constructor() {
    inject(Seo).set({
      title: 'Makila — Le don de sang qui sauve, partout en RDC',
      description:
        "Makila alerte les donneurs compatibles dès qu'un hôpital de leur ville manque de sang. Application gratuite pour les donneurs, en français et en kiswahili.",
      path: '/',
    });
  }
}
