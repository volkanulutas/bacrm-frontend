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
  return axios
    .post(API_BASE_URL + API_URL_DEPARTMENT, data, {
      headers: authHeader(),
    })
    .then((response) => {
      console.log("Başarılı:", response.data);
    })
    .catch((error) => {
      console.error("Hata:", error);
      if (error.response) {
        console.log("Hata durumu:", error.response.status);
        console.log("Hata verisi:", error.response.data);
      } else if (error.request) {
        console.log("İstek gönderildi, ancak yanıt alınamadı");
      } else {
        console.error("İstek gönderirken bir hata oluştu:", error.message);
      }
    });
};

export const getDepartmentById = (id: string) => {
  return axios.get(API_BASE_URL + API_URL_DEPARTMENT + id, {
    headers: authHeader(),
  });
};

export const deleteDepartment = (id: number) => {
  return axios.delete(API_BASE_URL + API_URL_DEPARTMENT + id, {
    headers: authHeader(),
  });
};
