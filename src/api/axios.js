import axios from "axios";

const axiosClient = axios.create();

axiosClient.defaults.baseURL = "http://localhost:8080";

axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  // Authorization: `Bearer ${JSON.parse(localStorage.getItem("Token"))}`,
  "Access-Control-Allow-Origin":"*",
};

axiosClient.defaults.timeout = 2000;
axiosClient.defaults.withCredentials = true;

export default axiosClient;