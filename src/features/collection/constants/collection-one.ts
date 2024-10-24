import { Collection } from '../collection.model';
import type { CollectionData } from '../collection.types';

const COLLECTION_ONE_DATA: CollectionData = {
  id: 1,
  thumbnails: import.meta.glob(
    '@assets/collection-1/thumbnails/*.{jpg,jpeg,JPEG}',
    {
      import: 'default',
      eager: true,
    },
  ),
};

export const COLLECTION_ONE = new Collection(COLLECTION_ONE_DATA);
