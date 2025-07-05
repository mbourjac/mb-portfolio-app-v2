import { Collection } from '../collection.model';
import type { CollectionData } from '../collection.types';

const COLLECTION_ONE_DATA: CollectionData = {
  id: 1,
  title: 'paris',
  date: '2015 —',
  fragmentsCount: 123,
  picturesCount: 123,
};

export const COLLECTION_ONE = new Collection(COLLECTION_ONE_DATA);
