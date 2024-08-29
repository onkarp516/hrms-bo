import {
  dashboardAttendanceDataUrl,
  employeeLeaveDataUrl,
} from "@/services/api";
import { getHeader } from "@/helpers";
import axios from "axios";

export function dashboardAttendanceData(values) {
  return axios({
    url: dashboardAttendanceDataUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function employeeLeaveData(values) {
  return axios({
    url: employeeLeaveDataUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
