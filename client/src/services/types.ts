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
