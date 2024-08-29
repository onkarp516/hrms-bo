import config from "config";

export function createBranchUrl() {
  return `${config.apiUrl}/createBranch`;
}

export function listOfBranchUrl() {
  return `${config.apiUrl}/listOfBranch`;
}

export function findBranchUrl() {
  return `${config.apiUrl}/findBranch`;
}

export function updateBranchUrl() {
  return `${config.apiUrl}/updateBranch`;
}

export function deleteBranchUrl() {
  return `${config.apiUrl}/deleteBranch`;
}
