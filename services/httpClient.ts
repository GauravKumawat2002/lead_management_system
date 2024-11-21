"use server";
import axios from "axios";
import { cookies } from "next/headers";

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// Add a request interceptor
httpClient.interceptors.request.use(
  (config) => {
    const token = cookies().get("jwtToken")?.value;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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
