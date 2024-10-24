import { useRouteContext } from '@tanstack/react-router';

export const useCollections = () =>
  useRouteContext({
    from: '__root__',
    select: (context) => context.collections,
  });
