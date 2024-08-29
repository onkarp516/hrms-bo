import config from "config";

export function createLeaveMasterUrl() {
  return `${config.apiUrl}/createLeaveMaster`;
}

export function listOfLeaveMastersUrl() {
  return `${config.apiUrl}/listOfLeaveMasters`;
}

export function findLeaveMasterUrl() {
  return `${config.apiUrl}/findLeaveMaster`;
}

export function updateLeaveMasterUrl() {
  return `${config.apiUrl}/updateLeaveMaster`;
}

export function deleteLeaveMasterUrl() {
  return `${config.apiUrl}/deleteLeaveMaster`;
}
