import axios from "axios";
import authHeader from "./auth-header";
import authUserId from "./auth-user-id";

const API_URL = "http://localhost:8080/api/work/";

export const getAll = () => {
  alert(JSON.stringify(authHeader()));
  return axios.get(API_URL, { headers: authHeader() });
};
