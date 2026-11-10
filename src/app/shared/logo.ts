import { ChangeDetectionStrategy, Component, input } from '@angular/core';

let uid = 0;

/** Logo Makila : la ligne plate entre dans la goutte et en ressort en battement (« M »). */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 100 100" [style.width.px]="size()" [style.height.px]="size()">
      <defs>
        <linearGradient [attr.id]="'g' + id" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" stop-color="#FF4D6A" /><stop offset="0.55" stop-color="#E0213F" /><stop offset="1" stop-color="#A80F33" />
        </linearGradient>
        <clipPath [attr.id]="'d' + id"><path [attr.d]="drop" /></clipPath>
      </defs>
      <path [attr.d]="pulse" fill="none" [attr.stroke]="mono() ? 'currentColor' : '#E0213F'" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round" />
      <path [attr.d]="drop" [attr.fill]="mono() ? 'currentColor' : 'url(#g' + id + ')'" />
      <g [attr.clip-path]="'url(#d' + id + ')'">
        <path [attr.d]="pulse" fill="none" stroke="#FFFFFF" stroke-width="5.4" stroke-linecap="round" stroke-linejoin="round" />
      </g>
    </svg>
  `,
  styles: `:host{display:inline-flex}`,
})
export class Logo {
  readonly size = input(32);
  readonly mono = input(false);
  protected readonly id = `mk${++uid}`;
  protected readonly drop = 'M50 5 C44 17 23 37 23 60.5 A27 27 0 0 0 77 60.5 C77 37 56 17 50 5 Z';
  protected readonly pulse = 'M3 63 H31.5 L36 41.5 L50 59 L64 41.5 L67.5 68.5 L70.5 63 H97';
}
