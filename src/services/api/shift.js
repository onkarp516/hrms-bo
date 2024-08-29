import config from "config";

export function createShiftUrl() {
  return `${config.apiUrl}/createShift`;
}

export function listOfShiftsUrl() {
  return `${config.apiUrl}/listOfShifts`;
}

export function findShiftUrl() {
  return `${config.apiUrl}/findShift`;
}

export function updateShiftUrl() {
  return `${config.apiUrl}/updateShift`;
}

export function deleteShiftUrl() {
  return `${config.apiUrl}/deleteShift`;
}
