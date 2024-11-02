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

export interface UploadedFile {
  name: string;
  data: Buffer; // Ensure the data is of type Buffer
}
