export type User = {
  name: string;
  email: string;
  username: string;
  _id: string;
  createdAt: string;
  avatar: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type CreateBlogPayload = {
  title: string;
  summary: string;
  type: "publish" | "draft";
  tags: string[];
  content: string;
  thumbnail: string;
};

export type Blog = {
  _id: string;
  slug: string;
  title: string;
  summary: string;
  type: "publish" | "draft";
  tags: string[];
  thumbnail: string;
  readingTime: { minutes: number; text: string };
  author: User;
  publishedAt: string | null;
};

export type BlogDetail = Blog & {
  content: string;
  publishedAt: string;
};
