import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export const client = axios.create({
  baseURL,
});

export const getToken = () => {
  return localStorage.getItem("token");
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => localStorage.removeItem("token");

export const getAuthorizationHeader = () => {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
};
