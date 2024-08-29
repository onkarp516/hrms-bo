import {
  createEmployeeUrl,
  listOfEmployeeUrl,
  findEmployeeUrl,
  updateEmployeeUrl,
  deleteEmployeeUrl,
} from "@/services/api";
import { getHeader, fileHeader } from "@/helpers";
import axios from "axios";
import {
  employeeLeaveUrl,
  updateEmployeeLeaveStatusUrl,
  deleteEmployeeLeaveUrl,
} from "../api/employee";

export function createEmployee(values) {
  // console.log("getHeader>>", getHeader(), values);
  return axios({
    url: createEmployeeUrl(),
    method: "POST",
    headers: fileHeader(),
    data: values,
  });
}

export function listOfEmployee() {
  return axios({
    url: listOfEmployeeUrl(),
    method: "GET",
    headers: getHeader(),
  });
}

export function findEmployee(values) {
  return axios({
    url: findEmployeeUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function updateEmployee(values) {
  return axios({
    url: updateEmployeeUrl(),
    method: "POST",
    headers: fileHeader(),
    data: values,
  });
}

export function deleteEmployee(values) {
  return axios({
    url: deleteEmployeeUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function employeeLeave(values) {
  return axios({
    url: employeeLeaveUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function updateEmployeeLeaveStatus(values) {
  return axios({
    url: updateEmployeeLeaveStatusUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function deleteEmployeeLeave(values) {
  return axios({
    url: deleteEmployeeLeaveUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
