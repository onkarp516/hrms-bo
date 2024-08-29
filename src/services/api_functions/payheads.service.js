import {
  getUnderListURL,
  createPayheadUrl,
  payheadListUrl,
  findPayheadUrl,
  updatePayheadUrl,
  deletePayheadUrl,
} from "@/services/api";
import { getHeader } from "@/helpers";
import axios from "axios";

export function getUnderList() {
  return axios({
    url: getUnderListURL(),
    method: "GET",
    headers: getHeader(),
  });
}

export function createPayhead(values) {
  // console.log("getHeader>>", getHeader(), values);
  return axios({
    url: createPayheadUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function payheadList() {
  return axios({
    url: payheadListUrl(),
    method: "GET",
    headers: getHeader(),
  });
}

export function findPayhead(values) {
  return axios({
    url: findPayheadUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function updatePayhead(values) {
  return axios({
    url: updatePayheadUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function deletePayhead(values) {
  return axios({
    url: deletePayheadUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
