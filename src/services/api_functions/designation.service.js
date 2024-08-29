import {
  createDesignationUrl,
  listOfDesignationUrl,
  findDesignationUrl,
  updateDesignationUrl,
  deleteDesignationUrl,
} from "@/services/api";
import { getHeader } from "@/helpers";
import axios from "axios";

export function createDesignation(values) {
  return axios({
    url: createDesignationUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function listOfDesignation() {
  return axios({
    url: listOfDesignationUrl(),
    method: "GET",
    headers: getHeader(),
  });
}

export function findDesignation(values) {
  return axios({
    url: findDesignationUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function updateDesignation(values) {
  return axios({
    url: updateDesignationUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function deleteDesignation(values) {
  return axios({
    url: deleteDesignationUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
