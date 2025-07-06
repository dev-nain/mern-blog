import axios from "axios";
import { setToken, getToken, removeToken } from "./session";

const baseURL = import.meta.env.VITE_API_URL;

export const client = axios.create({
  baseURL,
});

export { setToken, getToken, removeToken };

export const getAuthorizationHeader = () => {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
};
