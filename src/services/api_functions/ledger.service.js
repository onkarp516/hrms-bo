import { getHeader, fileHeader } from "@/helpers";
import axios from "axios";
import {
  createLedgerURL,
  deleteledgerUrl,
  editLedgerURL,
  getLedgersByIdUrl,
  getLedgersURL,
  getUnderListForLedgerUrl,
} from "../api/ledger";

export function getUnderListForLedger(values) {
  return axios({
    url: getUnderListForLedgerUrl(),
    method: "GET",
    headers: getHeader(),
    data: values,
  });
}

export function createLedger(requestData) {
  return axios({
    url: createLedgerURL(),
    method: "POST",
    headers: fileHeader(),
    data: requestData,
  });
}

export function getLedgers() {
  return axios({
    url: getLedgersURL(),
    method: "GET",
    headers: getHeader(),
  });
}

export function delete_ledger(requestData) {
  return axios({
    url: deleteledgerUrl(),
    data: requestData,
    method: "POST",
    headers: fileHeader(),
  });
}

export function getLedgersById(requestData) {
  return axios({
    url: getLedgersByIdUrl(),
    method: "POST",
    headers: fileHeader(),
    data: requestData,
  });
}

export function editLedger(requestData) {
  return axios({
    url: editLedgerURL(),
    method: "POST",
    headers: fileHeader(),
    data: requestData,
  });
}
