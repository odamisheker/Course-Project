import axios from "axios";

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
  //! its necessary to return an array
  searchByUsername(data) {
    return this.apiClient.post("/search/get", data);
  }
}

export const apiClient = new api(BASE_URL);
