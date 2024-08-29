import {
  createDocumentUrl,
  listOfDocumentUrl,
  findDocumentUrl,
  updateDocumentUrl,
  deleteDocumentUrl,
} from "@/services/api";
import { getHeader } from "@/helpers";
import axios from "axios";

export function createDocument(values) {
  return axios({
    url: createDocumentUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function listOfDocument() {
  return axios({
    url: listOfDocumentUrl(),
    method: "GET",
    headers: getHeader(),
  });
}

export function findDocument(values) {
  return axios({
    url: findDocumentUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function updateDocument(values) {
  return axios({
    url: updateDocumentUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function deleteDocument(values) {
  return axios({
    url: deleteDocumentUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
