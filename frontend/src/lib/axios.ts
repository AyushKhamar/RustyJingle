// todo - this is how you should initialise it first so it makes sure all your requests are sent to a certain url, this is better than proxy except it doesnt add any headers to the requests
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api"
      : "/api",
});
