import { Collection } from '../collection.model';
import type { CollectionData } from '../collection.types';

const COLLECTION_FOUR_DATA: CollectionData = {
  id: 4,
  title: 'untitled',
  date: '2016 —',
  fragmentsCount: 192,
  picturesCount: 192,
};

export const COLLECTION_FOUR = new Collection(COLLECTION_FOUR_DATA);
