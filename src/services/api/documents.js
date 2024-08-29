import config from "config";

export function createDocumentUrl() {
  return `${config.apiUrl}/createDocument`;
}

export function listOfDocumentUrl() {
  return `${config.apiUrl}/listOfDocument`;
}

export function findDocumentUrl() {
  return `${config.apiUrl}/findDocument`;
}

export function updateDocumentUrl() {
  return `${config.apiUrl}/updateDocument`;
}

export function deleteDocumentUrl() {
  return `${config.apiUrl}/deleteDocument`;
}
