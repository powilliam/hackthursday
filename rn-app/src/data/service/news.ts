import axios from "axios";
import Constants from "expo-constants";

const service = axios.create({
  baseURL: Constants.manifest?.extra?.NEWS_API_URL,
});

service.interceptors.request.use((request) => ({
  ...request,
  headers: {
    ...request.headers,
    Authorization: `Bearer ${Constants.manifest?.extra?.NEWS_API_AUTH_KEY}`,
  },
}));

export default service;
