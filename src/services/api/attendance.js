import config from "config";

export function LateAttendanceReportUrl() {
  return `${config.apiUrl}/getLateAttendanceReport`;
}

export function ManualAttendanceReportUrl() {
  return `${config.apiUrl}/getManualAttendanceReport`;
}

export function DTAttendanceUrl() {
  return `${config.apiUrl}/DTAttendance`;
}
export function DTAbsentUrl() {
  return `${config.apiUrl}/DTAbsent`;
}

export function getEmployeeTodayTasksUrl() {
  return `${config.apiUrl}/getEmployeeTodayTasks`;
}

export function submitEmployeeTodayWagesUrl() {
  return `${config.apiUrl}/submitEmployeeTodayWages`;
}

export function getTasksQuantitiesUrl() {
  return `${config.apiUrl}/getTasksQuantities`;
}

export function updateTaskQuantitiesUrl() {
  return `${config.apiUrl}/updateTaskQuantities`;
}

export function getAttendanceHistoryUrl() {
  return `${config.apiUrl}/getAttendanceHistory`;
}

export function updateAttendanceUrl() {
  return `${config.apiUrl}/updateAttendance`;
}

export function getTaskDetailsForUpdateUrl() {
  return `${config.apiUrl}/getTaskDetailsForUpdate`;
}

export function updateTaskDetailsUrl() {
  return `${config.apiUrl}/updateTaskDetails`;
}

export function getEmployeeYearlyPresentUrl() {
  return `${config.apiUrl}/getEmployeeYearlyPresent`;
}

export function getEmployeeOperationViewUrl() {
  return `${config.apiUrl}/getEmployeeOperationView`;
}
 
export function todayEmployeeAttendanceUrl() {
  return `${config.apiUrl}/todayEmployeeAttendance`; 
}

export function getSalaryReportMonthWiseUrl() {
  return `${config.apiUrl}/getSalaryReportMonthWise`;
}

export function todayEmployeeTaskDataUrl() {
  return `${config.apiUrl}/todayEmployeeTaskData`;
}

export function updateTaskDataUrl() {
  return `${config.apiUrl}/updateTaskData`;
}

export function manualAttendanceUrl() {
  return `${config.apiUrl}/bo/addManualAttendance`;
}

export function manualStartTaskUrl() {
  return `${config.apiUrl}/bo/startTask`;
}

export function recalculateEmployeeTasksAttendanceUrl() {
  return `${config.apiUrl}/bo/recalculateEmployeeTasksAttendance`;
}

export function approveAttendanceUrl() {
  return `${config.apiUrl}/bo/approveAttendance`;
} 

export function deleteAttendanceUrl() {
  return `${config.apiUrl}/bo/deleteAttendance`;
}

export function deleteTaskUrl() {
  return `${config.apiUrl}/bo/deleteTask`;
}
export function getEmployeePaymentSheetUrl() {
  return `${config.apiUrl}/bo/getEmployeePaymentSheet`;
}

export function recalculateAllEmployeeTasksAttendanceUrl() {
  return `${config.apiUrl}/bo/recalculateAllEmployeeTasksAttendance`;
}

export function exportExcelTodayEmployeeAttendanceUrl(
  fromDate,
  attendanceDate,
  employeeId,
  attStatus
) {
  return `${config.apiUrl}/bo/exportExcelTodayEmployeeAttendance/${fromDate}/${attendanceDate}/${employeeId}/${attStatus}`;
}
