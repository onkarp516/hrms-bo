import config from "config";

export function createLevelsUrl() {
  return `${config.apiUrl}/createLevel`;
}

export function listOfLevelsUrl() {
  return `${config.apiUrl}/listOfLevels`;
}

export function findLevelUrl() {
  return `${config.apiUrl}/findLevel`;
}

export function updateLevelUrl() {
  return `${config.apiUrl}/updateLevel`;
}

export function deleteLevelUrl() {
  return `${config.apiUrl}/deleteLevel`;
}