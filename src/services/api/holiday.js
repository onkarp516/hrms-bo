import config from "config";

export function createHolidayUrl() {
  return `${config.apiUrl}/createHoliday`;
}

export function listOfHolidayUrl() {
  return `${config.apiUrl}/listOfHoliday`;
}

export function findHolidayUrl() {
  return `${config.apiUrl}/findHoliday`;
}

export function updateHolidayUrl() {
  return `${config.apiUrl}/updateHoliday`;
}

export function deleteHolidayUrl() {
  return `${config.apiUrl}/deleteHoliday`;
}
