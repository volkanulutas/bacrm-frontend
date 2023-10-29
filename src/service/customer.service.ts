import axios from "axios";
import authHeader from "./auth-header";
import authUserId from "./auth-user-id";
import { API_BASE_URL, API_URL_CUSTOMER } from "../constants";

export const getAllCustomer = () => {
  return axios.get(API_BASE_URL + API_URL_CUSTOMER, { headers: authHeader() });
};

export const createCustomer = (data: any) => {
  return axios.post(API_BASE_URL + API_URL_CUSTOMER, data, {
    headers: authHeader(),
  });
};

export const getCustomerById = (id: string) => {
  return axios.get(API_BASE_URL + API_URL_CUSTOMER + id, {
    headers: authHeader(),
  });
};

export const deleteCustomer = (id: number) => {
  return axios.delete(API_BASE_URL + API_URL_CUSTOMER + id, {
    headers: authHeader(),
  });
};
