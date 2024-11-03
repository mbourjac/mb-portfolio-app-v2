import { createRouter } from '@tanstack/react-router';
import { NotFound } from '../pages/NotFound';
import { routerContext } from './router.context';
import { routeTree } from './routeTree.gen';

export const router = createRouter({
  routeTree,
  context: routerContext,
  defaultNotFoundComponent: NotFound,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
