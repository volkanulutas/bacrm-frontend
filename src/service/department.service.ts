import axios from "axios";
import authHeader from "./auth-header";
import authUserId from "./auth-user-id";
import { API_BASE_URL, API_URL_DEPARTMENT } from "../constants";

export const getAllDepartment = () => {
  return axios.get(API_BASE_URL + API_URL_DEPARTMENT, {
    headers: authHeader(),
  });
};
