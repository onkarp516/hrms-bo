import config from "config";

export function getUnderListURL() {
  return `${config.apiUrl}/get_under_list`;
}

export function createPayheadUrl() {
  return `${config.apiUrl}/createPayhead`;
}

export function payheadListUrl() {
  return `${config.apiUrl}/payheadList`;
}

export function findPayheadUrl() {
  return `${config.apiUrl}/findPayhead`;
}

export function updatePayheadUrl() {
  return `${config.apiUrl}/updatePayhead`;
}

export function deletePayheadUrl() {
  return `${config.apiUrl}/deletePayhead`;
}
