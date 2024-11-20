import axios from "axios";
import { getToken } from "@/lib/tokenStorage";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  // timeout: 20000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// Add a request interceptor
httpClient.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default httpClient;
