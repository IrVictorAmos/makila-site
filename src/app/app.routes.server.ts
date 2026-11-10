import { RenderMode, ServerRoute } from '@angular/ssr';

/** Site entièrement statique : chaque page est pré-rendue au build. */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'confidentialite', renderMode: RenderMode.Prerender },
  { path: 'conditions', renderMode: RenderMode.Prerender },
  { path: 'suppression-compte', renderMode: RenderMode.Prerender },
  { path: '404', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
