import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Haut d'une capture de l'application, recadré (bento des fonctionnalités). */
@Component({
  selector: 'app-screen-crop',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <picture>
      <source type="image/webp" media="(prefers-color-scheme: dark)"
        [attr.srcset]="'/screens/' + shot() + '-dark-360.webp 360w, /screens/' + shot() + '-dark-720.webp 720w'" sizes="320px" />
      <source type="image/webp"
        [attr.srcset]="'/screens/' + shot() + '-360.webp 360w, /screens/' + shot() + '-720.webp 720w'" sizes="320px" />
      <img [src]="'/screens/' + shot() + '-720.webp'" [alt]="alt()" width="360" height="779" loading="lazy" decoding="async" />
    </picture>
  `,
  styles: `
    :host {
      display: block;
      overflow: hidden;
      border-radius: 28px 28px 0 0;
      border: 8px solid oklch(0.22 0.02 15);
      border-block-end: 0;
      background: oklch(0.22 0.02 15);
      box-shadow: var(--shadow-2);
    }
    img { inline-size: 100%; block-size: 100%; object-fit: cover; object-position: top; border-radius: 20px 20px 0 0; }
    picture { display: block; block-size: 100%; }
  `,
})
export class ScreenCrop {
  readonly shot = input.required<string>();
  readonly alt = input.required<string>();
}
