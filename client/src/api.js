import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8000";

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
      // config.headers.Authorization = token;
      config.headers.Authorization = `Bearer ${token}`;
      console.log(config.headers.Authorization);
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
  checkChat(data) {
    return this.apiClient.post("/chat/chat", data);
  }
  createChat(data) {
    return this.apiClient.post("/chat/chat/create", data);
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
  getChats(data) {
    return this.apiClient.post("/auth/chats", data);
  }

  getSalt(data) {
    return this.apiClient.get("/auth/login", data);
  }
}

export const apiClient = new api();
