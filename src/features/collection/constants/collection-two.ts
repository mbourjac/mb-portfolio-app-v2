import { Collection } from '../collection.model';
import type { CollectionData } from '../collection.types';

const COLLECTION_TWO_DATA: CollectionData = {
  id: 2,
  title: 'sud',
  date: '2014 —',
  thumbnails: import.meta.glob(
    '@assets/collection-2/thumbnails/*.{jpg,jpeg,JPEG}',
    {
      import: 'default',
      eager: true,
    },
  ),
  previews: import.meta.glob(
    '@assets/collection-2/previews/*.{jpg,jpeg,JPEG}',
    {
      import: 'default',
      eager: true,
    },
  ),
  pictures: {
    small: import.meta.glob(
      '@assets/collection-2/pictures/small/*.{jpg,jpeg,JPEG}',
      {
        import: 'default',
        eager: true,
      },
    ),
    medium: import.meta.glob(
      '@assets/collection-2/pictures/medium/*.{jpg,jpeg,JPEG}',
      {
        import: 'default',
        eager: true,
      },
    ),
    large: import.meta.glob(
      '@assets/collection-2/pictures/large/*.{jpg,jpeg,JPEG}',
      {
        import: 'default',
        eager: true,
      },
    ),
  },
};

export const COLLECTION_TWO = new Collection(COLLECTION_TWO_DATA);
