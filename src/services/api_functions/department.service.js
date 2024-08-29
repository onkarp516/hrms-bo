import {
  createDepartmentUrl,
  listOfDepartmentUrl,
  updateDepartmentUrl,
  deleteDepartmentUrl,
  findDepartmentUrl,
} from "@/services/api";
import { getHeader } from "@/helpers";
import axios from "axios";

export function createDepartment(values) {
  console.log("getHeader>>", getHeader(), values);
  return axios({
    url: createDepartmentUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function listOfDepartment() {
  return axios({
    url: listOfDepartmentUrl(),
    method: "GET",
    headers: getHeader(),
  });
}

export function findDepartment(values) {
  return axios({
    url: findDepartmentUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function updateDepartment(values) {
  return axios({
    url: updateDepartmentUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function deleteDepartment(values) {
  return axios({
    url: deleteDepartmentUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
