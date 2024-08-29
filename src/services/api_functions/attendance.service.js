import {
  getEmployeeTodayTasksUrl,
  submitEmployeeTodayWagesUrl,
  getTasksQuantitiesUrl,
  updateTaskQuantitiesUrl,
  getAttendanceHistoryUrl,
  updateAttendanceUrl,
  getTaskDetailsForUpdateUrl,
  updateTaskDetailsUrl,
  getEmployeeYearlyPresentUrl,
  getEmployeeOperationViewUrl,
  todayEmployeeAttendanceUrl,
  getSalaryReportMonthWiseUrl,
  todayEmployeeTaskDataUrl,
  updateTaskDataUrl,
  manualAttendanceUrl,
  manualStartTaskUrl,
  recalculateEmployeeTasksAttendanceUrl,
  approveAttendanceUrl,
  deleteAttendanceUrl,
  deleteTaskUrl,
  getEmployeePaymentSheetUrl,
  recalculateAllEmployeeTasksAttendanceUrl,
  ManualAttendanceReportUrl,
  LateAttendanceReportUrl,
} from "@/services/api";
import { getHeader, fileHeader } from "@/helpers";
import axios from "axios";

export function LateAttendanceReport(values) {
  return axios({
    url: LateAttendanceReportUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function ManualAttendanceReport(values) {
  return axios({
    url: ManualAttendanceReportUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function getEmployeeTodayTasks(values) {
  return axios({
    url: getEmployeeTodayTasksUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function submitEmployeeTodayWages(values) {
  return axios({
    url: submitEmployeeTodayWagesUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function getTasksQuantities(values) {
  return axios({
    url: getTasksQuantitiesUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function updateTaskQuantities(values) {
  return axios({
    url: updateTaskQuantitiesUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function getAttendanceHistory(values) {
  return axios({
    url: getAttendanceHistoryUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function updateAttendance(values) {
  return axios({
    url: updateAttendanceUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function getTaskDetailsForUpdate(values) {
  return axios({
    url: getTaskDetailsForUpdateUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function updateTaskDetails(values) {
  return axios({
    url: updateTaskDetailsUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function getEmployeeYearlyPresent(values) {
  return axios({
    url: getEmployeeYearlyPresentUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function getEmployeeOperationView(values) {
  return axios({
    url: getEmployeeOperationViewUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function todayEmployeeAttendance(values) {
  return axios({
    url: todayEmployeeAttendanceUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function getSalaryReportMonthWise(values) {
  return axios({
    url: getSalaryReportMonthWiseUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function todayEmployeeTaskData(values) {
  return axios({
    url: todayEmployeeTaskDataUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function updateTaskData(values) {
  return axios({
    url: updateTaskDataUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function manualAttendance(values) {
  return axios({
    url: manualAttendanceUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function manualStartTask(values) {
  return axios({
    url: manualStartTaskUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function recalculateEmployeeTasksAttendance(values) {
  return axios({
    url: recalculateEmployeeTasksAttendanceUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function approveAttendance(values) {
  return axios({
    url: approveAttendanceUrl(),
    method: "POST",
    headers: fileHeader(),
    data: values,
  });
}

export function deleteAttendance(values) {
  return axios({
    url: deleteAttendanceUrl(),
    method: "POST",
    headers: fileHeader(),
    data: values,
  });
}

export function deleteTask(values) {
  return axios({
    url: deleteTaskUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function getEmployeePaymentSheet(values) {
  return axios({
    url: getEmployeePaymentSheetUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function recalculateAllEmployeeTasksAttendance(values) {
  return axios({
    url: recalculateAllEmployeeTasksAttendanceUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
