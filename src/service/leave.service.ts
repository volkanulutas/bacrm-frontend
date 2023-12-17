import axios from "axios";
import authHeader from "./auth-header";
import authUserId from "./auth-user-id";
import { API_BASE_URL, API_URL_LEAVE } from "../constants";

export const getLeaveType = () => {
  return axios.get(API_BASE_URL + API_URL_LEAVE + "leave-type", {
    headers: authHeader(),
  });
};

export const getFreeLeaveType = () => {
  return axios.get(API_BASE_URL + API_URL_LEAVE + "free-leave-type", {
    headers: authHeader(),
  });
};

export const getPaidLeaveType = () => {
  return axios.get(API_BASE_URL + API_URL_LEAVE + "paid-leave-type", {
    headers: authHeader(),
  });
};

export const addLeave = (data: any) => {
  return axios.post(API_BASE_URL + API_URL_LEAVE, data, {
    headers: authHeader(),
  });
};

export const getAllLeaves = () => {
  return axios.get(API_BASE_URL + API_URL_LEAVE, {
    headers: authHeader(),
  });
};

export const getLeaveById = (id: string) => {
  return axios.get(API_BASE_URL + API_URL_LEAVE + id, {
    headers: authHeader(),
  });
};
