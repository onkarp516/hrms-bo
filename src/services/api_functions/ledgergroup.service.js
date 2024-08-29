import {
  createAssociateGroupsUrl,
  getLedgerGroupsUrl,
  findLedgerGroupUrl,
  editLedgerGroupsUrl,
  deleteLedgerGroupUrl,
} from "@/services/api";
import { getHeader, fileHeader } from "@/helpers";
import axios from "axios";

export function createAssociateGroups(values) {
  return axios({
    url: createAssociateGroupsUrl(),
    method: "POST",
    headers: fileHeader(),
    data: values,
  });
}

export function getLedgerGroups() {
  return axios({
    url: getLedgerGroupsUrl(),
    method: "GET",
    headers: getHeader(),
  });
}

export function findLedgerGroup(values) {
  return axios({
    url: findLedgerGroupUrl(),
    method: "POST",
    headers: fileHeader(),
    data: values,
  });
}

export function editLedgerGroups(values) {
  return axios({
    url: editLedgerGroupsUrl(),
    method: "POST",
    headers: fileHeader(),
    data: values,
  });
}

export function deleteLedgerGroup(values) {
  return axios({
    url: deleteLedgerGroupUrl(),
    method: "POST",
    headers: fileHeader(),
    data: values,
  });
}
