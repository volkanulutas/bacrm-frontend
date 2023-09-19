import axios from "axios";
import authHeader from "./AuthHeader";

import { API_BASE_URL, API_URL_EMPLOYEE } from "../constants";

class EmployeeService {
  getAllRoles() {
    return axios.get(API_BASE_URL + API_URL_EMPLOYEE, {
      headers: authHeader(),
    });
  }

  getRoleById(id: any) {
    return axios.get(API_BASE_URL + API_URL_EMPLOYEE + id, {
      headers: authHeader(),
    });
  }

  createRole(role: any) {
    return axios.post(API_BASE_URL + API_URL_EMPLOYEE, role, {
      headers: authHeader(),
    });
  }

  updateRole(id: any, role: any) {
    return axios.put(API_BASE_URL + API_URL_EMPLOYEE + id, role, {
      headers: authHeader(),
    });
  }

  deleteRole(id: any) {
    return axios.delete(API_BASE_URL + API_URL_EMPLOYEE + id, {
      headers: authHeader(),
    });
  }
}
