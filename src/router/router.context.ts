import type { Collection } from '../features/collection/collection.model';
import { COLLECTIONS } from '../features/collection/constants/collections';

export type RouterContext = {
  collections: Collection[];
};

export const routerContext: RouterContext = {
  collections: COLLECTIONS,
};
