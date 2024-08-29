import config from "config";

export function createDepartmentUrl() {
  return `${config.apiUrl}/createDepartment`;
}

export function listOfDepartmentUrl() {
  return `${config.apiUrl}/listOfDepartment`;
}

export function findDepartmentUrl() {
  return `${config.apiUrl}/findDepartment`;
}

export function updateDepartmentUrl() {
  return `${config.apiUrl}/updateDepartment`;
}

export function deleteDepartmentUrl() {
  return `${config.apiUrl}/deleteDepartment`;
}
