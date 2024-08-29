import { getHeader, fileHeader } from "@/helpers";
import axios from "axios";
import {
  listOfCompanyUrl,
  createCompanyUrl,
  getAllMasterSystemConfigUrl,
  getStateDataUrl,
  findCompanyUrl,
  updateCompanyUrl,
  deleteCompanyUrl,
  getGstDataUrl,
} from "@/services/api";

export function listOfCompany(values) {
  // console.log("getHeader>>", getHeader(), values);
  return axios({
    url: listOfCompanyUrl(),
    method: "GET",
    headers: getHeader(),
    data: values,
  });
}

export function getAllMasterSystemConfig(values) {
  // console.log("getHeader>>", getHeader(), values);
  return axios({
    url: getAllMasterSystemConfigUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function createCompany(values) {
  // console.log("getHeader>>", getHeader(), values);
  return axios({
    url: createCompanyUrl(),
    method: "POST",
    headers: fileHeader(),
    data: values,
  });
}

export function updateCompany(values) {
  // console.log("getHeader>>", getHeader(), values);
  return axios({
    url: updateCompanyUrl(),
    method: "POST",
    headers: fileHeader(),
    data: values,
  });
}

export function getStateData(values) {
  return axios({
    url: getStateDataUrl(),
    method: "Get",
    headers: getHeader(),
    data: values,
  });
}

export function findCompany(values) {
  return axios({
    url: findCompanyUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function deleteCompany(values) {
  return axios({
    url: deleteCompanyUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function getGstData(values) {
  return axios({
    url: getGstDataUrl(),
    method: "Get",
    headers: getHeader(),
    data: values,
  });
}
