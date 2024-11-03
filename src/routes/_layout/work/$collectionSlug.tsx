import { createFileRoute, notFound } from '@tanstack/react-router';
import { Collection } from '../../../pages/Collection/Collection';
import { CollectionNotFound } from '../../../pages/Collection/CollectionNotFound';

export const Route = createFileRoute('/_layout/work/$collectionSlug')({
  component: Collection,
  notFoundComponent: CollectionNotFound,
  loader: ({ params: { collectionSlug }, context: { collections } }) => {
    const collection = collections.find(
      (collection) => collection.slug === collectionSlug,
    );

    if (!collection) {
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      throw notFound();
    }

    return { collection };
  },
});
