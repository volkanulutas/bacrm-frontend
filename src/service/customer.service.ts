import axios from "axios";
import authHeader from "./auth-header";
import authUserId from "./auth-user-id";

const API_URL = "http://localhost:8080/api/customer/";

export const getAllCustomer = () => {
  return axios.get(API_URL, { headers: authHeader() });
};


export const createCustomer = (data:any) => {
  return axios.post(API_URL, data, { headers: authHeader() });
};

export const getCustomerById = (id:string) => {
  return axios.get(API_URL + id , { headers: authHeader() });
};