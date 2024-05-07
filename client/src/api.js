import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8000";

class api {
  apiClient;
  constructor(base_url) {
    this.apiClient = axios.create({
      baseURL: base_url,
      headers: {
        "Content-Type": "application/json",
        // * "Authorization": "token?",
        //! You can add other headers like authorization token here
      },
    });
const api_client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api_client.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class api {
  constructor() {
    this.apiClient = api_client;
  }

  //* сhecks for existence user and correctness of the password
  checkUser(data) {
    return this.apiClient.post("/auth/login", data);
  }

  //* add user to DB
  addUser(data) {
    return this.apiClient.post("/auth/registration", data);
  }

  //* search user in DB by username
  searchByUsername(data) {
    return this.apiClient.post("/search/get", data);
  }
}

export const apiClient = new api();
