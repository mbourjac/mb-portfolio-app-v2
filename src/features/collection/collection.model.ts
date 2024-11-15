import type { CollectionData } from './collection.types';

export class Collection {
  constructor(private readonly data: CollectionData) {}

  get id() {
    return this.data.id;
  }

  get slug() {
    return `collection-${String(this.data.id)}`;
  }

  get name() {
    return `collection ${String(this.data.id)}`;
  }

  get picturesCount() {
    return this.data.picturesCount;
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

  get thumbnails() {
    return this.generateImageUrls(this.data.thumbnailsCount, 'thumbnails');
  }

  get previews() {
    return this.generateImageUrls(this.picturesCount, 'previews');
  }

  get pictures() {
    return {
      small: this.generateImageUrls(this.picturesCount, 'pictures', 'small'),
      medium: this.generateImageUrls(this.picturesCount, 'pictures', 'medium'),
      large: this.generateImageUrls(this.picturesCount, 'pictures', 'large'),
    };
  }

  private generateImageUrls(count: number, folder: string, size = '') {
    const filePrefix = folder.endsWith('s') ? folder.slice(0, -1) : folder;
    return Array.from(
      { length: count },
      (_, index) =>
        `/images/${this.slug}/${folder}/${size ? `${size}/` : ''}${this.slug}-${filePrefix}-${String(index + 1)}.webp`,
    );
  }
}
