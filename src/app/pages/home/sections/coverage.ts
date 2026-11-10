import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DRC_CITIES, DRC_PATH, DRC_VIEWBOX } from '../../../data/drc-map';
import { Icon } from '../../../shared/icon';
import { Reveal } from '../../../shared/reveal';

@Component({
  selector: 'app-coverage',
  imports: [Icon, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './coverage.html',
  styleUrl: './coverage.scss',
})
export class Coverage {
  protected readonly viewBox = DRC_VIEWBOX;
  protected readonly path = DRC_PATH;
  protected readonly cities = DRC_CITIES;
  /** Villes dont le nom est affiché sur la carte. */
  protected readonly labelled = new Set(['Kinshasa', 'Lubumbashi', 'Kisangani', 'Bukavu', 'Goma', 'Mbuji-Mayi', 'Mbandaka', 'Kananga']);
  /** Décalage des étiquettes pour éviter les chevauchements. */
  protected labelDx(name: string): number {
    return ['Goma', 'Bukavu', 'Lubumbashi', 'Kisangani', 'Kananga'].includes(name) ? -10 : 10;
  }
  protected labelAnchor(name: string): string {
    return this.labelDx(name) < 0 ? 'end' : 'start';
  }
}
