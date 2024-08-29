import {
  createHolidayUrl,
  listOfHolidayUrl,
  updateHolidayUrl,
  deleteHolidayUrl,
  findHolidayUrl,
} from "@/services/api";
import { getHeader } from "@/helpers";
import axios from "axios";

export function createHoliday(values) {
  console.log("getHeader>>", getHeader(), values);
  return axios({
    url: createHolidayUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function listOfHoliday() {
  return axios({
    url: listOfHolidayUrl(),
    method: "GET",
    headers: getHeader(),
  });
}

export function findHoliday(values) {
  return axios({
    url: findHolidayUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function updateHoliday(values) {
  return axios({
    url: updateHolidayUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function deleteHoliday(values) {
  return axios({
    url: deleteHolidayUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
