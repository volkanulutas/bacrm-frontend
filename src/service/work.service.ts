import axios from "axios";
import authHeader from "./auth-header";
import authUserId from "./auth-user-id";

import { API_BASE_URL, API_URL_WORK } from "../constants";


export const getAll = () => {
  return axios.get(API_BASE_URL + API_URL_WORK, { headers: authHeader() });
};


export const createWork = (data:any) => {
  return axios.post(API_BASE_URL + API_URL_WORK, data, { headers: authHeader() });
};

export const getWorkById = (id:string) => {
  return axios.get(API_BASE_URL + API_URL_WORK + id , { headers: authHeader() });
};