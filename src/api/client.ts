import axios from "axios";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      return Promise.reject(
        error.response.data.message || "Something went wrong"
      );
    } else if (error.request) {
      return Promise.reject("No response received from server");
    } else {
      return Promise.reject(error.message || "Request failed");
    }
  }
);

export default axiosInstance;
