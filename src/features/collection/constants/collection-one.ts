import { Collection } from '../collection.model';
import type { CollectionData } from '../collection.types';

const COLLECTION_ONE_DATA: CollectionData = {
  id: 1,
  title: 'paris',
  date: '2015 —',
  thumbnails: import.meta.glob(
    '@assets/collection-1/thumbnails/*.{jpg,jpeg,JPEG}',
    {
      import: 'default',
      eager: true,
    },
  ),
  previews: import.meta.glob(
    '@assets/collection-1/previews/*.{jpg,jpeg,JPEG}',
    {
      import: 'default',
      eager: true,
    },
  ),
  pictures: import.meta.glob(
    '@assets/collection-1/pictures/*.{jpg,jpeg,JPEG}',
    {
      import: 'default',
      eager: true,
    },
  ),
};

export const COLLECTION_ONE = new Collection(COLLECTION_ONE_DATA);
