import { client, getAuthorizationHeader } from "./api-client";
import type { AuthResponse, Blog, CreateBlogPayload, User } from "./types";

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

type UploadFileResponse = {
  filePath: string;
};
export const uploadImage = async (formdata: FormData) => {
  const response = await client.post<UploadFileResponse>(
    "/v1/blogs/upload-image",
    formdata,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        ...getAuthorizationHeader(),
      },
    }
  );
  return response.data;
};

type BlogResponse = {
  data: Blog
}

export const createBlog = async (blog: CreateBlogPayload) => {
  const response = await client.post<BlogResponse>("/v1/blogs", blog, {
    headers: getAuthorizationHeader(),
  });
  return response.data;
};
