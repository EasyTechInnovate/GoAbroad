import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://your-api-base-url.com/api/v1",
  timeout: 10000,
});

export default apiClient;
