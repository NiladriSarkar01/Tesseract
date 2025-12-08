import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://tesseract-backend-j00k.onrender.com/api",
  withCredentials: true,
});
