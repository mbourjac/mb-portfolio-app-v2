import { Collection } from '../collection.model';
import type { CollectionData } from '../collection.types';

const COLLECTION_THREE_DATA: CollectionData = {
  id: 3,
  title: 'japon',
  date: '2019 7.15 — 8.13',
  thumbnails: import.meta.glob('@assets/collection-3/thumbnails/*.webp', {
    import: 'default',
    eager: true,
  }),
  previews: import.meta.glob('@assets/collection-3/previews/*.webp', {
    import: 'default',
    eager: true,
  }),
  pictures: {
    small: import.meta.glob('@assets/collection-3/pictures/small/*.webp', {
      import: 'default',
      eager: true,
    }),
    medium: import.meta.glob('@assets/collection-3/pictures/medium/*.webp', {
      import: 'default',
      eager: true,
    }),
    large: import.meta.glob('@assets/collection-3/pictures/large/*.webp', {
      import: 'default',
      eager: true,
    }),
  },
};

export const COLLECTION_THREE = new Collection(COLLECTION_THREE_DATA);
