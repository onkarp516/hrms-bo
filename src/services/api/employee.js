import config from "config";

export function createEmployeeUrl() {
  return `${config.apiUrl}/createEmployee`;
}

export function listOfEmployeeUrl() {
  return `${config.apiUrl}/listOfEmployee`;
}

export function findEmployeeUrl() {
  return `${config.apiUrl}/findEmployee`;
}

export function updateEmployeeUrl() {
  return `${config.apiUrl}/updateEmployee`;
}

export function deleteEmployeeUrl() {
  return `${config.apiUrl}/deleteEmployee`;
}

export function employeeLeaveUrl() {
  return `${config.apiUrl}/getEmpLeaveRequests`;
}

export function updateEmployeeLeaveStatusUrl() {
  return `${config.apiUrl}/updateEmployeeLeaveStatus`;
}

export function deleteEmployeeLeaveUrl() {
  return `${config.apiUrl}/deleteEmployeeLeave`;
}
