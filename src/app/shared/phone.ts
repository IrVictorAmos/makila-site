import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Capture réelle de l'application dans un cadre de téléphone. */
@Component({
  selector: 'app-phone',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="frame">
      <picture>
        <source type="image/webp" media="(prefers-color-scheme: dark)" [attr.srcset]="srcset('-dark')" [attr.sizes]="sizes()" />
        <source type="image/webp" [attr.srcset]="srcset('')" [attr.sizes]="sizes()" />
        <img [src]="'/screens/' + shot() + '-720.webp'" [alt]="alt()" width="360" height="779"
          [attr.loading]="eager() ? 'eager' : 'lazy'" [attr.fetchpriority]="eager() ? 'high' : null" decoding="async" />
      </picture>
    </div>
  `,
  styles: `
    :host { display: block; inline-size: 100%; max-inline-size: var(--phone-w, 320px); }
    .frame {
      position: relative;
      padding: 30px 9px 9px;
      border-radius: 44px;
      background: linear-gradient(160deg, oklch(0.34 0.02 15), oklch(0.17 0.02 15));
      box-shadow: inset 0 0 0 1.5px oklch(1 0 0 / 0.12), var(--shadow-3);
    }
    .frame::before {
      content: '';
      position: absolute;
      inset-block-start: 12px;
      inset-inline-start: 50%;
      translate: -50% 0;
      inline-size: 22%;
      block-size: 7px;
      border-radius: 999px;
      background: oklch(0.1 0.01 15);
      box-shadow: inset 0 1px 0 oklch(1 0 0 / 0.08);
    }
    img { inline-size: 100%; block-size: auto; border-radius: 10px 10px 36px 36px; background: var(--sunken); }
  `,
})
export class Phone {
  /** Nom de la capture dans /public/screens (sans taille ni extension). */
  readonly shot = input.required<string>();
  readonly alt = input.required<string>();
  readonly eager = input(false);
  readonly sizes = input('(max-width: 600px) 70vw, 320px');
  protected srcset(variant: string): string {
    const s = this.shot() + variant;
    return `/screens/${s}-360.webp 360w, /screens/${s}-720.webp 720w`;
  }
}
