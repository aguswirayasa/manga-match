// types/MangaPost.ts
export type MangaPost = {
  id: number;
  title: string;
  content: string;
  type: string;
  image: string;
  createdAt: Date;
  author: User;
  authorId: string;
  isLiked: boolean;
  isFavorited: boolean;
  likes: {
    userId: string;
  }[];
  favorites: {
    userId: string;
  }[];
};

export type User = {
  username: string;
  avatar?: string | null;
  bio?: string;
  id?: string | number;
};

export interface UploadedFile {
  name: string;
  data: Buffer;
}
