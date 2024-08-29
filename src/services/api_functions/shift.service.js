import {
  createShiftUrl,
  listOfShiftsUrl,
  findShiftUrl,
  updateShiftUrl,
  deleteShiftUrl,
} from "@/services/api";
import { getHeader } from "@/helpers";
import axios from "axios";

export function createShift(values) {
  return axios({
    url: createShiftUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function listOfShifts() {
  return axios({
    url: listOfShiftsUrl(),
    method: "GET",
    headers: getHeader(),
  });
}

export function findShift(values) {
  return axios({
    url: findShiftUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function updateShift(values) {
  return axios({
    url: updateShiftUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function deleteShift(values) {
  return axios({
    url: deleteShiftUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
