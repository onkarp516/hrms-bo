import {
  createLevelsUrl,
  listOfLevelsUrl,
  updateLevelUrl,
  deleteLevelUrl,
  findLevelUrl,
} from "@/services/api";
import { getHeader } from "@/helpers";
import axios from "axios";

export function createLevels(values) {
  console.log("getHeader>>", getHeader(), values);
  return axios({
    url: createLevelsUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function listOfLevels() {
  return axios({
    url: listOfLevelsUrl(),
    method: "GET",
    headers: getHeader(),
  });
}

export function findLevel(values) {
  return axios({
    url: findLevelUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function updateLevel(values) {
  return axios({
    url: updateLevelUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function deleteLevel(values) {
  return axios({
    url: deleteLevelUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
