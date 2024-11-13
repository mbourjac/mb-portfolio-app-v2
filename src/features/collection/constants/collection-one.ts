import { Collection } from '../collection.model';
import type { CollectionData } from '../collection.types';

const COLLECTION_ONE_DATA: CollectionData = {
  id: 1,
  title: 'paris',
  date: '2015 —',
  thumbnails: import.meta.glob('@assets/collection-1/thumbnails/*.webp', {
    import: 'default',
    eager: true,
  }),
  previews: import.meta.glob('@assets/collection-1/previews/*.webp', {
    import: 'default',
    eager: true,
  }),
  pictures: {
    small: import.meta.glob('@assets/collection-1/pictures/small/*.webp', {
      import: 'default',
      eager: true,
    }),
    medium: import.meta.glob('@assets/collection-1/pictures/medium/*.webp', {
      import: 'default',
      eager: true,
    }),
    large: import.meta.glob('@assets/collection-1/pictures/large/*.webp', {
      import: 'default',
      eager: true,
    }),
  },
};

export const COLLECTION_ONE = new Collection(COLLECTION_ONE_DATA);
