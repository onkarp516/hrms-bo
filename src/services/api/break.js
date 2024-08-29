import config from "config";

export function createBreakUrl() {
  return `${config.apiUrl}/createBreak`;
}

export function listOfBreakUrl() {
  return `${config.apiUrl}/listOfBreak`;
}

export function findBreakUrl() {
  return `${config.apiUrl}/findBreak`;
}

export function updateBreakUrl() {
  return `${config.apiUrl}/updateBreak`;
}

export function deleteBreakUrl() {
  return `${config.apiUrl}/deleteBreak`;
}
