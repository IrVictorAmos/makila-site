import { ChangeDetectionStrategy, Component } from '@angular/core';
import { fmtNumber } from '../../../shared/format';
import { Reveal } from '../../../shared/reveal';

/** Le constat : besoins en sang de la RDC (sources CNTS / OMS). */
@Component({
  selector: 'app-stats',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stats.html',
  styleUrl: './stats.scss',
})
export class Stats {
  protected readonly need = 750_000;
  protected readonly collected = 481_559;
  protected readonly share = Math.round((this.collected / this.need) * 100);
  protected readonly missing = this.need - this.collected;
  protected readonly fmt = fmtNumber;
}
