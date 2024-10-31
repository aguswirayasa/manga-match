// types/MangaPost.ts
export type MangaPost = {
  id: number;
  title: string;
  author?: string;
  cover?: string;
  rating?: number;
  genre?: string[];
  isFavorited?: boolean;
  description: string;
};
