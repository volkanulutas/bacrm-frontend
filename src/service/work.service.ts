import axios from "axios";
import authHeader from "./auth-header";
import authUserId from "./auth-user-id";

const API_URL = "http://localhost:8080/api/work/";

export const getAll = () => {

  return axios.get(API_URL, { headers: authHeader() });
};


export const createWork = (data:any) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};