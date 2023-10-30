import axios from "axios";
import authHeader from "./auth-header";
import authUserId from "./auth-user-id";
import { API_BASE_URL, API_URL_EMPLOYEE } from "../constants";


export const getEmployeeById = (id:string) => {
  return axios.get(API_BASE_URL + API_URL_EMPLOYEE + id, { headers: authHeader() });
};

export const getAll = () => {
  return axios.get(API_BASE_URL + API_URL_EMPLOYEE, { headers: authHeader() });
};


export const deleteUser = (id: number) => {
  return axios.delete(API_BASE_URL + API_URL_EMPLOYEE + id, {
    headers: authHeader(),
  });
};
