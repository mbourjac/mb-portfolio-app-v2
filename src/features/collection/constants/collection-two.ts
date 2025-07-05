import { Collection } from '../collection.model';
import type { CollectionData } from '../collection.types';

const COLLECTION_TWO_DATA: CollectionData = {
  id: 2,
  title: 'sud',
  date: '2014 —',
  fragmentsCount: 88,
  picturesCount: 106,
};

export const COLLECTION_TWO = new Collection(COLLECTION_TWO_DATA);
