export type CollectionData = {
  id: number;
  title: string;
  date: string;
  thumbnails: Record<string, string>;
  previews: Record<string, string>;
  pictures: {
    small: Record<string, string>;
    medium: Record<string, string>;
    large: Record<string, string>;
  };
};
