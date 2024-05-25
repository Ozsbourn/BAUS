export interface PostType {
  _id: number;
  label?: string | null;
  content: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export type PostList = PostType[];
