import axios from "axios";
import authHeader from "./auth-header";
import authUserId from "./auth-user-id";
import { API_BASE_URL, API_URL_PROPOSAL } from "../constants";

export const getAll = () => {
  return axios.get(API_BASE_URL + API_URL_PROPOSAL, { headers: authHeader() });
};

export const getProposalById = (id:string) => {
    return axios.get(API_BASE_URL + API_URL_PROPOSAL + id , { headers: authHeader() });
  };