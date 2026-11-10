import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE } from '../site.config';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  /** Pas d'indexation (page 404). */
  noindex?: boolean;
}

/** Titre, description, URL canonique et balises de partage (Open Graph, X). */
@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  set(page: PageSeo): void {
    const url = SITE.url + (page.path === '/' ? '/' : page.path);
    const image = `${SITE.url}/og-image.png`;
    this.title.setTitle(page.title);
    const tags: Record<string, string> = {
      description: page.description,
      'og:title': page.title,
      'og:description': page.description,
      'og:url': url,
      'og:type': 'website',
      'og:site_name': SITE.name,
      'og:locale': 'fr_CD',
      'og:image': image,
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': 'Makila, le don de sang qui sauve en RDC',
      'twitter:card': 'summary_large_image',
      'twitter:title': page.title,
      'twitter:description': page.description,
      'twitter:image': image,
    };
    for (const [key, content] of Object.entries(tags)) {
      const attr = key.startsWith('og:') ? 'property' : 'name';
      this.meta.updateTag({ [attr]: key, content } as never);
    }
    this.meta.updateTag({ name: 'robots', content: page.noindex ? 'noindex' : 'index, follow' });

    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
