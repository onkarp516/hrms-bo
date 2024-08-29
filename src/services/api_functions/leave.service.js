import {
  createLeaveMasterUrl,
  listOfLeaveMastersUrl,
  findLeaveMasterUrl,
  updateLeaveMasterUrl,
  deleteLeaveMasterUrl,
} from "@/services/api";
import { getHeader } from "@/helpers";
import axios from "axios";

export function createLeaveMaster(values) {
  return axios({
    url: createLeaveMasterUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function listOfLeaveMasters() {
  return axios({
    url: listOfLeaveMastersUrl(),
    method: "GET",
    headers: getHeader(),
  });
}

export function findLeaveMaster(values) {
  return axios({
    url: findLeaveMasterUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function updateLeaveMaster(values) {
  return axios({
    url: updateLeaveMasterUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function deleteLeaveMaster(values) {
  return axios({
    url: deleteLeaveMasterUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
