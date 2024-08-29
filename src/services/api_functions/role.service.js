import { getHeader, fileHeader } from "@/helpers";
import axios from "axios";
import {
  getMasterActionsUrl,
  getSystemsAllPermissionsUrl,
} from "@/services/api";
import {
  DTRolesUrl,
  createUserRolesURL,
  getRolePermissionsForEditUrl,
  updateRoleUrl,
  getRolePermissionsURL,
  deleteRoleURL,
} from "../api/role";

export function getMasterActions(values) {
  return axios({
    url: getMasterActionsUrl(),
    method: "GET",
    headers: getHeader(),
    data: values,
  });
}

export function getSystemsAllPermissions(values) {
  return axios({
    url: getSystemsAllPermissionsUrl(),
    method: "GET",
    headers: getHeader(),
    data: values,
  });
}

export function createUserRole(requestData) {
  return axios({
    url: createUserRolesURL(),
    data: requestData,
    method: "POST",
    headers: fileHeader(),
  });
}

export function DTRoles(values) {
  return axios({
    url: DTRolesUrl(),
    method: "GET",
    headers: getHeader(),
    data: values,
  });
}

export function getRolePermissionsForEdit(requestData) {
  return axios({
    url: getRolePermissionsForEditUrl(),
    data: requestData,
    method: "POST",
    headers: fileHeader(),
  });
}

export function updateRole(requestData) {
  return axios({
    url: updateRoleUrl(),
    data: requestData,
    method: "POST",
    headers: fileHeader(),
  });
}

export function getRolePermissions(requestData) {
  return axios({
    url: getRolePermissionsURL(),
    data: requestData,
    method: "POST",
    headers: fileHeader(),
  });
}

export function deleteRole(requestData) {
  return axios({
    url: deleteRoleURL(),
    data: requestData,
    method: "POST",
    headers: fileHeader(),
  });
}
