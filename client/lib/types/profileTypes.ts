export type LandingPage = {
  name: string;
  content: string; // Serialized JSON
  createdAt: string;
  updatedAt: string;
};

export type Post = {
  authorId: string;
  publishedAt: string;
  content: string; // Serialized JSON
};
