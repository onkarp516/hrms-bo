import config from "config";

export function dashboardAttendanceDataUrl() {
  return `${config.apiUrl}/bo/getDashboardAttendanceData`;
}

export function employeeLeaveDataUrl() {
  return `${config.apiUrl}/bo/getEmployeeLeaveData`;
}
