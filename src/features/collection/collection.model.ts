import type { CollectionData } from './collection.types';

export class Collection {
  constructor(private readonly data: CollectionData) {}

  get thumbnails() {
    return this.sortPathsByIndex(this.data.thumbnails);
  }

  get previews() {
    return this.sortPathsByIndex(this.data.previews);
  }

  get pictures() {
    return {
      small: this.sortPathsByIndex(this.data.pictures.small),
      medium: this.sortPathsByIndex(this.data.pictures.medium),
      large: this.sortPathsByIndex(this.data.pictures.large),
    };
  }

  get picturesCount() {
    return this.pictures.small.length;
  }

  get id() {
    return this.data.id;
  }

  get slug() {
    return `collection-${String(this.data.id)}`;
  }

  get name() {
    return `collection ${String(this.data.id)}`;
  }

  get titleAndDate() {
    const { title, date } = this.data;
    return `${title ? `${title}, ` : ''}${date}`;
  }

  get baseInfo() {
    return `${this.name}, ${this.titleAndDate}`;
  }

  get fullInfo() {
    return `${this.baseInfo}. ${String(this.picturesCount)} pictures`;
  }

  private sortPathsByIndex(paths: Record<string, string>) {
    const getPathIndex = (path: string): number => {
      const match = path.match(/\d+(?=\.)/);
      return match ? parseInt(match[0], 10) : Infinity;
    };

    return Object.values(paths).sort(
      (a, b) => getPathIndex(a) - getPathIndex(b),
    );
  }
}
