import axios from "axios";
import authHeader from "./auth-header";
import authUserId from "./auth-user-id";

import { API_BASE_URL, API_URL_DEPARTMENT } from "../constants";

export const getAllDepartment = () => {
  return axios.get(API_BASE_URL + API_URL_DEPARTMENT, {
    headers: authHeader(),
  });
};

export const createDepartment = (data: any) => {
  return axios.post(API_BASE_URL + API_URL_DEPARTMENT, data, {
    headers: authHeader(),
  });
};

export const getDepartmentById = (id: string) => {
  return axios.get(API_BASE_URL + API_URL_DEPARTMENT + id, {
    headers: authHeader(),
  });
};
