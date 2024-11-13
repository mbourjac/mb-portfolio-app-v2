import { Collection } from '../collection.model';
import type { CollectionData } from '../collection.types';

const COLLECTION_THREE_DATA: CollectionData = {
  id: 3,
  title: 'japon',
  date: '2019 7.15 — 8.13',
  thumbnails: import.meta.glob(
    '@assets/collection-3/thumbnails/*.{jpg,jpeg,JPEG}',
    {
      import: 'default',
      eager: true,
    },
  ),
  previews: import.meta.glob(
    '@assets/collection-3/previews/*.{jpg,jpeg,JPEG}',
    {
      import: 'default',
      eager: true,
    },
  ),
  pictures: {
    small: import.meta.glob(
      '@assets/collection-3/pictures/small/*.{jpg,jpeg,JPEG}',
      {
        import: 'default',
        eager: true,
      },
    ),
    medium: import.meta.glob(
      '@assets/collection-3/pictures/medium/*.{jpg,jpeg,JPEG}',
      {
        import: 'default',
        eager: true,
      },
    ),
    large: import.meta.glob(
      '@assets/collection-3/pictures/large/*.{jpg,jpeg,JPEG}',
      {
        import: 'default',
        eager: true,
      },
    ),
  },
};

export const COLLECTION_THREE = new Collection(COLLECTION_THREE_DATA);
