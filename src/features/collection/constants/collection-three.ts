import { Collection } from '../collection.model';
import type { CollectionData } from '../collection.types';

const COLLECTION_THREE_DATA: CollectionData = {
  id: 1,
  thumbnails: import.meta.glob(
    '@assets/collection-3/thumbnails/*.{jpg,jpeg,JPEG}',
    {
      import: 'default',
      eager: true,
    },
  ),
};

export const COLLECTION_THREE = new Collection(COLLECTION_THREE_DATA);
