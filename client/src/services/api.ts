import { client, getAuthorizationHeader } from "./api-client";
import type { AuthResponse, User } from "./types";

type AuthPayload = {
  email: string;
  password: string;
  name: string;
};

export const login = async (data: Omit<AuthPayload, "name">) => {
  const response = await client.post<AuthResponse>("/v1/auth/login", data);
  return response.data;
};

export const register = async (data: AuthPayload) => {
  const response = await client.post<AuthResponse>("/v1/auth/register", data);
  return response.data;
};

type ProfileResponse = {
  user: User;
};

export const getProfile = async () => {
  const response = await client.get<ProfileResponse>("/v1/auth/me", {
    headers: getAuthorizationHeader(),
  });
  return response.data;
};
