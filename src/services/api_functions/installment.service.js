import { getHeader, fileHeader } from "@/helpers";
import axios from "axios";
import {
  createInstallmentUrl,
  getInstallmentsListUrl,
  listOfAdvancePaymentWithInstallmentsUrl,
} from "../api/installment";

export function listOfAdvancePaymentWithInstallments(values) {
  return axios({
    url: listOfAdvancePaymentWithInstallmentsUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function getInstallmentsList(values) {
  return axios({
    url: getInstallmentsListUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}

export function createInstallment(values) {
  return axios({
    url: createInstallmentUrl(),
    method: "POST",
    headers: getHeader(),
    data: values,
  });
}
