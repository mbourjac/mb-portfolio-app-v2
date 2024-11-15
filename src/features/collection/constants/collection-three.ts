import { Collection } from '../collection.model';
import type { CollectionData } from '../collection.types';

const COLLECTION_THREE_DATA: CollectionData = {
  id: 3,
  title: 'japon',
  date: '2019 7.15 — 8.13',
  thumbnailsCount: 265,
  picturesCount: 287,
};

export const COLLECTION_THREE = new Collection(COLLECTION_THREE_DATA);
