import axios from "axios";

const apiUrl = "http://localhost:3000";
const jwtKey = "accessToken";

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url as string);
    const allowedOrigins = [apiUrl];
    const accessToken = localStorage.getItem(jwtKey);
    if (allowedOrigins.includes(origin)) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const isStoredJwt = () => Boolean(localStorage.getItem(jwtKey));
export const createUrl = (endpoint: string) => new URL(endpoint, apiUrl).href;
export const setStoredJwt = (accessToken: string) =>
  localStorage.setItem(jwtKey, accessToken);

export const get = axios.get;
export const post = axios.post;
export const patch = axios.patch;
export const del = axios.delete;
