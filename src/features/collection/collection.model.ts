import type { CollectionData } from './collection.types';

export class Collection {
  constructor(private readonly data: CollectionData) {}

  get thumbnails() {
    return Object.keys(this.data.thumbnails);
  }
}
