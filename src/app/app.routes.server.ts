import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'checout/:c_id',
    renderMode: RenderMode.Client
  },
  {
    path: 'product-details/:p_id',
    renderMode: RenderMode.Client
  },
];

