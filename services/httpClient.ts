import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://api.example.com", // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
    // Add any other custom headers if needed
  },
});

// Add a request interceptor
httpClient.interceptors.request.use(
  config => {
    // Do something before request is sent, like adding auth token
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
httpClient.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    return Promise.reject(error);
  }
);

export default httpClient;
