import axios from "axios";

const clientAPI = axios.create({
  baseURL: "http://localhost:3000/api", // Set the base URL for all API requests
  withCredentials: true,
});

export default clientAPI;