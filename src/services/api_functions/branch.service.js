import {
  createBranchUrl,
  listOfBranchUrl,
  findBranchUrl,
  updateBranchUrl,
  deleteBranchUrl,
} from "@/services/api";
import { getHeader } from "@/helpers";
import axios from "axios";

export function createBranch(values) {
  return axios({
    url: createBranchUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function listOfBranch() {
  return axios({
    url: listOfBranchUrl(),
    method: "GET",
    headers: getHeader(),
  });
}

export function findBranch(values) {
  return axios({
    url: findBranchUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function updateBranch(values) {
  return axios({
    url: updateBranchUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function deleteBranch(values) {
  return axios({
    url: deleteBranchUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
