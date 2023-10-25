import axios from "axios";

import { API_BASE_URL, API_URL_AUTH } from "../constants";

export const register = (username: string, email: string, password: string) => {
  return axios.post(API_BASE_URL + API_URL_AUTH  + "signup", {
    username,
    email,
    password,
  });
};

export const authServiceLogin = (email: string, password: string) => {
  return axios
    .post(API_BASE_URL + API_URL_AUTH  + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log( JSON.stringify(response.data))
      }
      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
