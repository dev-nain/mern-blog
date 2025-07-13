import axios from "axios";
import { getToken, removeToken } from "./session";

const baseURL = import.meta.env.VITE_API_URL;

export const client = axios.create({
  baseURL,
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        removeToken();

        if (typeof window !== "undefined") {
          window.location.href = "/sign-in";
        }
      }
    }

    return Promise.reject(error);
  }
);

export const getAuthorizationHeader = () => {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
};
