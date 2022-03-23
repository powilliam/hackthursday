import axios from "axios";
import Constants from "expo-constants";

const service = axios.create({
  baseURL: Constants.manifest?.extra?.newsUrl,
});

service.interceptors.request.use((request) => ({
  ...request,
  headers: {
    ...request.headers,
    Authorization: `Bearer ${Constants.manifest?.extra?.newsSecret}`,
  },
}));

export default service;
