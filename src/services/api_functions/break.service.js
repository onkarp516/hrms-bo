import {
  createBreakUrl,
  listOfBreakUrl,
  findBreakUrl,
  updateBreakUrl,
  deleteBreakUrl,
} from "@/services/api";
import { getHeader } from "@/helpers";
import axios from "axios";

export function createBreak(values) {
  return axios({
    url: createBreakUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function listOfBreak(values) {
  return axios({
    url: listOfBreakUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

// export function listOfBreak() {
//   return axios({
//     url: listOfBreakUrl(),
//     method: "POST",
//     headers: getHeader(),
//   });
// }

export function findBreak(values) {
  return axios({
    url: findBreakUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function updateBreak(values) {
  return axios({
    url: updateBreakUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function deleteBreak(values) {
  return axios({
    url: deleteBreakUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
