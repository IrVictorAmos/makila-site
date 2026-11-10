import { afterNextRender, Directive, ElementRef, inject, input, OnDestroy } from '@angular/core';

/** Fait apparaître l'élément quand il entre à l'écran (classe `.reveal`, voir styles.scss). */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal', '[attr.style]': 'delay() ? "--reveal-delay:" + delay() + "ms" : null' },
})
export class Reveal implements OnDestroy {
  readonly delay = input(0, { alias: 'appReveal', transform: (v: unknown) => Number(v) || 0 });
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement;
      if (!('IntersectionObserver' in window)) {
        node.classList.add('is-visible');
        return;
      }
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              node.classList.add('is-visible');
              this.observer?.disconnect();
            }
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
      );
      this.observer.observe(node);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
