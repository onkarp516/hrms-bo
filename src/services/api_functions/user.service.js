import { getHeader, fileHeader } from "@/helpers";
import axios from "axios";
import {
  createUserWithRolesURL,
  getUsersListUrl,
  getUserByIdUrl,
  updateUserUrl,
  deleteUserURL,
  listOfManagersUrl,
  getUserPermissionURL,
} from "../api/user";

export function createUserWithRoles(requestData) {
  return axios({
    url: createUserWithRolesURL(),
    data: requestData,
    method: "POST",
    headers: fileHeader(),
  });
}

export function getUsersList(values) {
  return axios({
    url: getUsersListUrl(),
    method: "GET",
    headers: getHeader(),
    data: values,
  });
}

export function getUserById(values) {
  return axios({
    url: getUserByIdUrl(),
    method: "POST",
    headers: fileHeader(),
    data: values,
  });
}

export function updateUser(values) {
  return axios({
    url: updateUserUrl(),
    method: "POST",
    headers: fileHeader(),
    data: values,
  });
}

export function deleteUser(requestData) {
  return axios({
    url: deleteUserURL(),
    data: requestData,
    method: "POST",
    headers: fileHeader(),
  });
}
export function listOfManagers(values) {
    // console.log("getHeader>>", getHeader(), values);
    return axios({
      url: listOfManagersUrl(),
      method: "GET",
      headers: getHeader(),
      data: values,
    });
}

export function getUserPermission(requestData) {
  return axios({
    url: getUserPermissionURL(),
    data: requestData,
    method: "POST",
    headers: fileHeader(),
  });
}
